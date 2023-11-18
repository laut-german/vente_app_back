import { User } from "../../domain/entities/user.entity";
import { LanguageEnum } from "@users/domain/enums/language.enum";

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  language: LanguageEnum;
  profilePicture: string;
}

export const userResponseFromDomain = (entity: User): UserResponse => ({
  id: entity.id.toString(),
  name: entity.name,
  email: entity.email,
  language: entity.language,
  profilePicture: entity.profilePicture,
});
