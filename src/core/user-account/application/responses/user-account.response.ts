import { UserAccount } from "../../domain/entities/user-account.entity";
import { LanguageEnum } from "@users/domain/enums/language.enum";
export interface GetUserAccountResponse {
  id: string;
  uid: string;
  name: string;
  email: string;
  language: LanguageEnum;
  profilePicture: string;
}

export const userResponseFromDomain = (
  entity: UserAccount,
): GetUserAccountResponse => ({
  id: entity.id.toString(),
  uid: entity.uid,
  name: entity.name,
  email: entity.email,
  language: entity.language,
  profilePicture: entity.profilePicture,
});
