import { UserAccount } from "@users/domain/entities/user-account.entity";

export const USER_ACCOUNT_REPOSITORY = Symbol();

export interface UserAccountRepository {
  createUserAccount(user: UserAccount): Promise<UserAccount>;
  findUserAccountById(id: string): Promise<UserAccount>;
  findUserAccountByEmail(email: string): Promise<UserAccount>;
  findUserAccountByUid(uid: string): Promise<UserAccount>;
  save(entity: UserAccount): Promise<UserAccount>;
}
