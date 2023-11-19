import { UserDocument } from "./user-account.schema";
import { UserAccount, UserProps } from "@users/domain/entities/user-account.entity";

export class UserAccountMapper {
  toEntity = (document: UserDocument): UserAccount => {
    return UserAccount.create(this.userDocumentToProps(document));
  };
  private userDocumentToProps(document: UserDocument): UserProps {
    return {
      id: document.id,
      name: document.name,
      email: document.email,
      profilePicture: document.profilePicture,
      language: document.language,
    };
  }
}
