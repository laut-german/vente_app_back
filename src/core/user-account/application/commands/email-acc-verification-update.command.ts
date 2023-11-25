import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject, Logger } from "@nestjs/common";
import {
  USER_ACCOUNT_REPOSITORY,
  UserAccountRepository,
} from "../../domain/storage/user-account.repository";

import { CrateUserAccountResponse } from "../responses/crate-user-account.response";
import {
  AUTH_PROVIDER_REPOSITORY,
  AuthProviderRepository,
} from "../../domain/storage/auth-provider.repository";
import { UserAccountDoesNotExistError } from "@users/domain/errors/user-account-does-not-exist.error";
import {
  emailVerificationResponseFromDomain,
  EmailVerificationUpdateResponse
} from "@users/application/responses/email-verification-update.response";
import { FirebaseAccountNotUpdatedError } from "@users/domain/errors/firebase-account-not-updated.error";
import {
  EMAIL_VERIFICATION_REPOSITORY,
  EmailVerificationRepository,
} from "@users/domain/storage/email-verification.repository";
import { StatusEmailVerificationEnum } from "@users/domain/enums/status-email-verification.enum";
import {AccEmailTokenExpiredError} from "@users/domain/errors/acc-email-token-expired.error";

export class EmailAccVerificationUpdateCommand {
  constructor(
    public readonly id: string,
    public readonly emailVerified: boolean,
  ) {}
}

@CommandHandler(EmailAccVerificationUpdateCommand)
export class EmailAccVerificationUpdateCommandHandler
  implements
    ICommandHandler<
      EmailAccVerificationUpdateCommand,
      EmailVerificationUpdateResponse
    >
{
  private logger = new Logger(EmailAccVerificationUpdateCommandHandler.name);
  constructor(
    @Inject(USER_ACCOUNT_REPOSITORY)
    private readonly userAccountRepository: UserAccountRepository,
    @Inject(AUTH_PROVIDER_REPOSITORY)
    private authProviderRepository: AuthProviderRepository,
    @Inject(EMAIL_VERIFICATION_REPOSITORY)
    private readonly emailVerificationRepository: EmailVerificationRepository,
  ) {}

  async execute({
    id,
    emailVerified,
  }: EmailAccVerificationUpdateCommand): Promise<EmailVerificationUpdateResponse> {
    const userAccount =
      await this.userAccountRepository.findUserAccountById(id);

    if (!userAccount) {
      throw new UserAccountDoesNotExistError();
    }
    try {
      await this.authProviderRepository.updateAccount(userAccount.uid, {
        emailVerified,
      });
    } catch (error) {
      this.logger.error(`An error occurred, ${error}`);
      throw new FirebaseAccountNotUpdatedError(userAccount.email);
    }

    const verificationRecord =
      await this.emailVerificationRepository.getVerificationRecord(
        userAccount.id,
      );

    if (verificationRecord.expiresAt < new Date()) {
      throw new AccEmailTokenExpiredError();
    }
    verificationRecord.update({
      status:
        emailVerified === true
          ? StatusEmailVerificationEnum.Verified
          : StatusEmailVerificationEnum.Unverified,
    });
    const updatedEmailVerification =
      await this.emailVerificationRepository.save(verificationRecord);
    return emailVerificationResponseFromDomain(updatedEmailVerification);
  }
}
