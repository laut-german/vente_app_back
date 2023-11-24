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
import { UserAccountDoesNotExistError } from "@users/domain/errors/user-account-does-not-exist.error";
import { emailVerificationResponseFromDomain } from "@users/application/responses/email-verification-update.response";
import {FirebaseAccountNotUpdatedError} from "@users/domain/errors/firebase-account-not-updated.error";
export class EmailAccVerificationUpdateCommand {
  constructor(
    public readonly id: string,
    public readonly emailVerification: boolean,
  ) {}
}

@CommandHandler(EmailAccVerificationUpdateCommand)
export class EmailAccVerificationUpdateCommandHandler
  implements
    ICommandHandler<EmailAccVerificationUpdateCommand, UserAccountResponse>
{
  private logger = new Logger(EmailAccVerificationUpdateCommandHandler.name);
  constructor(
    @Inject(USER_ACCOUNT_REPOSITORY)
    private readonly userAccountRepository: UserAccountRepository,
    @Inject(AUTH_PROVIDER_REPOSITORY)
    private authProviderRepository: AuthProviderRepository,
  ) {}

  async execute({
    id,
    emailVerification,
  }: EmailAccVerificationUpdateCommand): Promise<any> {
    const userAccount =
      await this.userAccountRepository.findUserAccountById(id);

    if (!userAccount) {
      throw new UserAccountDoesNotExistError();
    }
    try {
      await this.authProviderRepository.updateAccount(userAccount.uid, {
        emailVerified: true,
      });
    } catch (error) {
      this.logger.error(`An error occurred, ${error}`);
      throw new FirebaseAccountNotUpdatedError(userAccount.email);
    }

    userAccount.update({ emailVerification });
    const updatedUser = await this.userAccountRepository.save(userAccount);
    return emailVerificationResponseFromDomain(updatedUser);
  }
}
