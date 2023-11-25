import {UserDocument, UserModel} from "./user-account.schema";
import { UserAccount, UserProps } from "@users/domain/entities/user-account.entity";

export class UserAccountMapper {
  toEntity = (document: UserDocument): UserAccount => {
    return UserAccount.create(this.userDocumentToProps(document));
  };

  toModel = (userAccount: UserAccount): UserModel => {
    return {
      id: userAccount.id,
      uid: userAccount.uid,
      name: userAccount.name,
      email: userAccount.email,
      profilePicture: userAccount.profilePicture,
      language: userAccount.language,
    };
  };
  private userDocumentToProps(document: UserDocument): UserProps {
    return {
      id: document.id,
      uid: document.uid,
      name: document.name,
      email: document.email,
      profilePicture: document.profilePicture,
      language: document.language,
    };
  }
}
