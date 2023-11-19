import { auth } from "firebase-admin";
import UserRecord = auth.UserRecord;
import DecodedIdToken = auth.DecodedIdToken;

export const AUTH_PROVIDER_REPOSITORY = Symbol();
export interface AuthProviderRepository {
  createAccount(
    name: string,
    email: string,
    password: string,
  ): Promise<UserRecord>;
  verifyIdToken(token: string): Promise<DecodedIdToken>;
}
