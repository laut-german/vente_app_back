import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { UserDocument } from "../schemas/user-account.schema";
import { UserAccountRepository } from "@users/domain/storage/user-account.repository";
import { UserAccount } from "@users/domain/entities/user-account.entity";
import { UserAccountMapper } from "../schemas/user-account.mapper";
export class MongoUserRepository implements UserAccountRepository {
  private mapper = new UserAccountMapper();
  constructor(
    @InjectModel(UserDocument.name) private userModel: Model<UserDocument>,
  ) {}

  async createUserAccount(newUser: UserAccount): Promise<UserAccount> {
    const userDocument = await new this.userModel({
      name: newUser.name,
      profilePicture: newUser.profilePicture,
      email: newUser.email,
      language: newUser.language,
      uid: newUser.uid,
    }).save();
    return this.mapper.toEntity(userDocument);
  }

  async findUserAccountById(id: string): Promise<UserAccount> {
    const userDocument = await this.userModel.findOne({ id }).exec();
    return userDocument ? this.mapper.toEntity(userDocument) : undefined;
  }

  async findUserAccountByEmail(email: string): Promise<UserAccount> {
    const userDocument = await this.userModel.findOne({ email });
    return userDocument ? this.mapper.toEntity(userDocument) : undefined;
  }

  async findUserAccountByUid(uid: string): Promise<UserAccount> {
    const userDocument = await this.userModel.findOne({ uid });
    return userDocument ? this.mapper.toEntity(userDocument) : undefined;
  }
  async save(userAccount: UserAccount): Promise<UserAccount> {
    const model = this.mapper.toModel(userAccount);
    const userDocument = await this.userModel.findOneAndUpdate(
      { id: userAccount.id },
      { $set: model },
      { new: true },
    );
    return userDocument ? this.mapper.toEntity(userDocument) : undefined;
  }
}
