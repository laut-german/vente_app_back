import { UserAccount } from "../../domain/entities/user-account.entity";
import { LanguageEnum } from "@users/domain/enums/language.enum";
import { EmailAccountVerification } from "@users/domain/entities/email-acc-verification.entitity";

export interface CrateUserAccountResponse {
  id: string;
  uid: string;
  name: string;
  email: string;
  language: LanguageEnum;
  profilePicture: string;
  verificationToken: string;
}

export const userResponseFromDomain = (
  entity: UserAccount,
  emailVerificationEntity: EmailAccountVerification,
): CrateUserAccountResponse => ({
  id: entity.id.toString(),
  uid: entity.uid,
  name: entity.name,
  email: entity.email,
  language: entity.language,
  profilePicture: entity.profilePicture,
  verificationToken: emailVerificationEntity.verificationToken,
});
