import { UserDocument } from "./user.schema";
import { User, UserProps } from "@users/domain/entities/user.entity";

export class UserMapper {
  toEntity = (document: UserDocument): User => {
    return User.create(this.userDocumentToProps(document));
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
