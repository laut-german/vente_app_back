import { auth } from "firebase-admin";
import UserRecord = auth.UserRecord;

export const ACCOUNT_REPOSITORY = Symbol();
export interface AccountRepository {
  createUserAccount(
    name: string,
    email: string,
    password: string,
  ): Promise<UserRecord>;
}
