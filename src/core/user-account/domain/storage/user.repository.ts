import { User } from "../../domain/entities/user.entity";

export const USER_REPOSITORY = Symbol();

export interface UserRepository {
  createUser(newUser: User): Promise<User>;
  findUserById(userId: string): Promise<User>;
  findUserByEmail(email: string): Promise<User>;
}
