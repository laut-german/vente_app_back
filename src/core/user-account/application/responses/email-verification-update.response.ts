import { UserAccount } from "../../domain/entities/user-account.entity";

export interface EmailVerificationUpdateResponse {
  id: string;
  emailVerification: boolean;
}

export const emailVerificationResponseFromDomain = (
  entity: UserAccount,
): EmailVerificationUpdateResponse => ({
  id: entity.id.toString(),
  emailVerification: entity.emailVerification,
});
