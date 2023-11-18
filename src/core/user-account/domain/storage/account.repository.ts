import { auth } from "firebase-admin";
import UserRecord = auth.UserRecord;
import DecodedIdToken = auth.DecodedIdToken;

export const ACCOUNT_REPOSITORY = Symbol();
export interface AccountRepository {
  createUserAccount(
    name: string,
    email: string,
    password: string,
  ): Promise<UserRecord>;
  verifyIdToken(token: string): Promise<DecodedIdToken>;
}
