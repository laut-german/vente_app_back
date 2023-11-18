import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { UserDocument } from "../schemas/user.schema";
import { UserRepository } from "../../../domain/storage/user.repository";
import { User } from "../../../domain/entities/user.entity";
import { UserMapper } from "../schemas/user.mapper";
export class MongoUserRepository implements UserRepository {

  private mapper = new UserMapper();
  constructor(
    @InjectModel(UserDocument.name) private userModel: Model<UserDocument>,
  ) {}

  async createUser(newUser: User): Promise<User> {
    const userDocument = await new this.userModel({
      name: newUser.name,
      profilePicture: newUser.profilePicture,
      email: newUser.email,
      language: newUser.language,
      uid: newUser.uid,
    }).save();
    return this.mapper.toEntity(userDocument);
  }

  async findUserById(userId: string): Promise<User> {
    const userDocument = await this.userModel.findById(userId).exec();
    return userDocument ? this.mapper.toEntity(userDocument) : undefined;
  }

  async findUserByEmail(email: string): Promise<User> {
    const userDocument = await this.userModel.findOne({ email });
    return userDocument ? this.mapper.toEntity(userDocument) : undefined;
  }
}
