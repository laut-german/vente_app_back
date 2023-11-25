import { EmailAccountVerification } from "@users/domain/entities/email-acc-verification.entitity";
import { StatusEmailVerificationEnum } from "@users/domain/enums/status-email-verification.enum";

export interface EmailVerificationUpdateResponse {
  id: string;
  emailVerification: boolean;
}

export const emailVerificationResponseFromDomain = (
  entity: EmailAccountVerification,
): EmailVerificationUpdateResponse => ({
  id: entity.userAccountId.toString(),
  emailVerification: entity.status === StatusEmailVerificationEnum.Verified,
});
