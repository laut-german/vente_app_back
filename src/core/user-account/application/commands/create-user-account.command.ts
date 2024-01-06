import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject, Logger } from "@nestjs/common";
import {
  USER_ACCOUNT_REPOSITORY,
  UserAccountRepository,
} from "../../domain/storage/user-account.repository";
import { UserEmailAlreadyExists } from "../../domain/errors/user-email-already-exists.error";
import { UserAccount } from "../../domain/entities/user-account.entity";
import {
  CrateUserAccountResponse,
  userResponseFromDomain,
} from "../responses/crate-user-account.response";
import {
  AUTH_PROVIDER_REPOSITORY,
  AuthProviderRepository,
} from "../../domain/storage/auth-provider.repository";
import { FirebaseAccountNotCreatedError } from "../../domain/errors/firebase-account-not-created.error";
import { LanguageEnum } from "@users/domain/enums/language.enum";
import { EmailAccountVerification } from "@users/domain/entities/email-acc-verification.entitity";
import {
  EMAIL_VERIFICATION_REPOSITORY,
  EmailVerificationRepository,
} from "@users/domain/storage/email-verification.repository";
import { AuthService } from "@users/application/auth.service";
import {MAILER_SERVICE, MailerService} from "../../../../shared/domain/mailer.service";
export class CreateUserAccountCommand {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly language: LanguageEnum,
    public readonly password: string,
  ) {}
}

@CommandHandler(CreateUserAccountCommand)
export class CreateUserCommandHandler
  implements
    ICommandHandler<CreateUserAccountCommand, CrateUserAccountResponse>
{
  private logger = new Logger(CreateUserCommandHandler.name);
  constructor(
    @Inject(USER_ACCOUNT_REPOSITORY)
    private readonly userAccountRepository: UserAccountRepository,
    @Inject(AUTH_PROVIDER_REPOSITORY)
    private authProviderRepository: AuthProviderRepository,
    @Inject(EMAIL_VERIFICATION_REPOSITORY)
    private readonly emailVerificationRepository: EmailVerificationRepository,
    private readonly authService: AuthService,
    @Inject(MAILER_SERVICE)
        private readonly mailService: MailerService,
  ) {}

  async execute({
    name,
    email,
    language,
    password,
  }: CreateUserAccountCommand): Promise<CrateUserAccountResponse> {
    const emailExists =
      await this.userAccountRepository.findUserAccountByEmail(email);
    if (emailExists) {
      throw new UserEmailAlreadyExists(email);
    }
    let userFirebaseAccount;
    try {
      userFirebaseAccount = await this.authProviderRepository.createAccount(
        name,
        email,
        password,
      );
    } catch (error) {
      this.logger.error(`An error occurred, ${error}`);
      throw new FirebaseAccountNotCreatedError(email);
    }

    if (!userFirebaseAccount) {
      throw new FirebaseAccountNotCreatedError(email);
    }
    const userAccount = await this.userAccountRepository.createUserAccount(
      UserAccount.create({
        name,
        email,
        language,
        uid: userFirebaseAccount.uid,
      }),
    );
    const verificationToken = this.authService.createEmailVerificationToken(
      userAccount.id,
      userAccount.email,
    );
    const emailVerificationRecord =
      await this.emailVerificationRepository.create(
        EmailAccountVerification.create({
          userAccountId: userAccount.id,
          email,
          verificationToken,
        }),
      );
    await this.mailService.send(null);
    return userResponseFromDomain(userAccount, emailVerificationRecord);
  }
}
