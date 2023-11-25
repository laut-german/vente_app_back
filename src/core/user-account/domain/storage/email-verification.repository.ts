import { EmailAccountVerification } from "@users/domain/entities/email-acc-verification.entitity";

export const EMAIL_VERIFICATION_REPOSITORY = Symbol();
export interface EmailVerificationRepository {
  create(entity: EmailAccountVerification): Promise<EmailAccountVerification>;
  save(entity: EmailAccountVerification): Promise<EmailAccountVerification>;
  getVerificationRecord(
    userAccountId: string,
  ): Promise<EmailAccountVerification>;
  //verifyToken(token: string): Promise<boolean>;
}
