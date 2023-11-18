import { AccountRepository } from "@users/domain/storage/account.repository";
import admin, { auth } from "firebase-admin";
import UserRecord = auth.UserRecord;
import DecodedIdToken = auth.DecodedIdToken;
export class FirebaseAccountRepository implements AccountRepository {
  constructor() {}
  async createUserAccount(
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
