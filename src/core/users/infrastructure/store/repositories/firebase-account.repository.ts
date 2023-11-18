import { AccountRepository } from "@users/domain/storage/account.repository";
import admin, { auth } from "firebase-admin";
import UserRecord = auth.UserRecord;

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
}
