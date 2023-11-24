import { AuthProviderRepository } from "@users/domain/storage/auth-provider.repository";
import admin, { auth } from "firebase-admin";
import UserRecord = auth.UserRecord;
import DecodedIdToken = auth.DecodedIdToken;
import { UpdateRequest } from "firebase-admin/lib/auth";
export class FirebaseProviderRepository implements AuthProviderRepository {
  constructor() {}
  async createAccount(
    name: string,
    email: string,
    password: string,
  ): Promise<UserRecord> {
    const firebaseUser = {
      email,
      password,
      displayName: name,
      returnSecureToken: true,
      emailVerified: true,
    };
    return await admin.app().auth().createUser(firebaseUser);
  }

  async updateAccount(uid: string, fields: UpdateRequest): Promise<UserRecord> {
    return admin.app().auth().updateUser(uid, fields);
  }

  async verifyIdToken(token: string): Promise<DecodedIdToken> {
    return await admin.app().auth().verifyIdToken(token, true);
  }
}
