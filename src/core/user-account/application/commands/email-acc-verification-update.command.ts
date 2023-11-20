import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
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
import { LanguageEnum } from "@users/domain/enums/language.enum";
import { UserAccountDoesNotExistError } from "@users/domain/errors/user-account-does-not-exist.error";
import { emailVerificationResponseFromDomain } from "@users/application/responses/email-verification-update.response";
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
    userAccount.update({ emailVerification });
    const updatedUser = await this.userAccountRepository.save(userAccount);
    return emailVerificationResponseFromDomain(updatedUser);
  }
}
