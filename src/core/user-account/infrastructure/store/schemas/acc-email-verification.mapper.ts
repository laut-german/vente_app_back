import {
  AccountEmailVerificationDocument,
  AccountEmailVerificationModel
} from "@users/infrastructure/store/schemas/account-email-verification.schema";
import {
  EmailAccountProps,
  EmailAccountVerification,
} from "@users/domain/entities/email-acc-verification.entitity";
import {VerifyEmailOutDto} from "@users/infrastructure/http/common-dtos/verify-email-out.dto";

export class AccEmailVerificationMapper {
  toEntity = (
    document: AccountEmailVerificationDocument,
  ): EmailAccountVerification => {
    return EmailAccountVerification.create(
      this.accEmailVerificationDocumentToProps(document),
    );
  };

  toModel = (
    entity: EmailAccountVerification,
  ): AccountEmailVerificationModel => {
    return {
      id: entity.id.toString(),
      email: entity.email,
      verificationToken: entity.verificationToken,
      status: entity.status,
      expiresAt: entity.expiresAt,
    };
  };
  private accEmailVerificationDocumentToProps(
    document: AccountEmailVerificationDocument,
  ): EmailAccountProps {
    return {
      id: document.id,
      email: document.email,
      status: document.status,
      userAccountId: document.userAccountId,
      verificationToken: document.verificationToken,
      expiresAt: document.expiresAt,
    };
  }
}
