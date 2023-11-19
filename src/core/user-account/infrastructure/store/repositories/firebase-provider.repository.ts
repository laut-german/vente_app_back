import { AuthProviderRepository } from "@users/domain/storage/auth-provider.repository";
import admin, { auth } from "firebase-admin";
import UserRecord = auth.UserRecord;
import DecodedIdToken = auth.DecodedIdToken;
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
    };
    return await admin.app().auth().createUser(firebaseUser);
  }

  async verifyIdToken(token: string): Promise<DecodedIdToken> {
    return await admin.app().auth().verifyIdToken(token, true);
  }
}
