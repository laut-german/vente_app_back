import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import {Inject, Logger} from "@nestjs/common";
import {
  USER_ACCOUNT_REPOSITORY,
  UserAccountRepository,
} from "../../domain/storage/user-account.repository";
import { UserEmailAlreadyExists } from "../../domain/errors/user-email-already-exists.error";
import { UserAccount } from "../../domain/entities/user-account.entity";
import {
  UserAccountResponse,
  userResponseFromDomain,
} from "../responses/user-account.response";
import {
  AUTH_PROVIDER_REPOSITORY,
  AuthProviderRepository,
} from "../../domain/storage/auth-provider.repository";
import { FirebaseAccountNotCreatedError } from "../../domain/errors/firebase-account-not-created.error";
import { LanguageEnum } from "@users/domain/enums/language.enum";
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
  implements ICommandHandler<CreateUserAccountCommand, UserAccountResponse>
{
  private logger = new Logger(CreateUserCommandHandler.name);
  constructor(
    @Inject(USER_ACCOUNT_REPOSITORY)
    private readonly userAccountRepository: UserAccountRepository,
    @Inject(AUTH_PROVIDER_REPOSITORY)
    private authProviderRepository: AuthProviderRepository,
  ) {}

  async execute({
    name,
    email,
    language,
    password,
  }: CreateUserAccountCommand): Promise<UserAccountResponse> {
    const emailExists =
      await this.userAccountRepository.findUserAccountByEmail(email);
    if (emailExists) {
      throw new UserEmailAlreadyExists(email);
    }
    let userAccount;
    try {
      userAccount = await this.authProviderRepository.createAccount(
        name,
        email,
        password,
      );
    } catch (error) {
      this.logger.error(`An error occurred, ${error}`);
      throw new FirebaseAccountNotCreatedError(email);
    }

    if (!userAccount) {
      throw new FirebaseAccountNotCreatedError(email);
    }
    const user = await this.userAccountRepository.createUserAccount(
      UserAccount.create({ name, email, language, uid: userAccount.uid }),
    );
    return userResponseFromDomain(user);
  }
}
