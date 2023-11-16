import { User } from "@users/domain/entities/user.entity";

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
}

export const userResponseFromDomain = (entity: User): UserResponse => ({
  id: entity.id.toString(),
  name: entity.name,
  email: entity.email,
  profilePicture: entity.profilePicture,
});
