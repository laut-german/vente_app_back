import { auth } from "firebase-admin";
import UserRecord = auth.UserRecord;
import DecodedIdToken = auth.DecodedIdToken;
import { UpdateRequest } from "firebase-admin/lib/auth";

export const AUTH_PROVIDER_REPOSITORY = Symbol();
export interface AuthProviderRepository {
  createAccount(
    name: string,
    email: string,
    password: string,
  ): Promise<UserRecord>;
  updateAccount(uid: string, fields: UpdateRequest): Promise<UserRecord>;
  verifyIdToken(token: string): Promise<DecodedIdToken>;
}
