import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { UserDocument } from "../schemas/user-account.schema";
import { UserAccountRepository } from "@users/domain/storage/user-account.repository";
import { UserAccount } from "@users/domain/entities/user-account.entity";
import { UserAccountMapper } from "../schemas/user-account.mapper";
export class MongoUserAccountRepository implements UserAccountRepository {
  private mapper = new UserAccountMapper();
  constructor(
    @InjectModel(UserDocument.name) private userModel: Model<UserDocument>,
  ) {}

  async createUserAccount(entity: UserAccount): Promise<UserAccount> {
    const userDocument = await new this.userModel({
      name: entity.name,
      profilePicture: entity.profilePicture,
      email: entity.email,
      language: entity.language,
      uid: entity.uid,
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
  async save(entity: UserAccount): Promise<UserAccount> {
    const model = this.mapper.toModel(entity);
    const userDocument = await this.userModel.findOneAndUpdate(
      { id: entity.id },
      { $set: model },
      { new: true },
    );
    return userDocument ? this.mapper.toEntity(userDocument) : undefined;
  }
}
