import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { LanguageEnum } from "@users/domain/enums/language.enum";

@Schema({ collection: "user-accounts", timestamps: true })
export class UserDocument extends Document {
  @Prop({
    required: true,
    type: String,
    unique: true,
    index: true,
    default: () => uuidv4(),
  })
  id: string;
  @Prop({
    required: true,
    type: String,
    unique: true,
    index: true,
  })
  uid: string;
  @Prop({ required: true, type: String })
  name: string;
  @Prop({ required: true, type: String, unique: true, index: true })
  email: string;
  @Prop({ required: false, type: String })
  profilePicture: string;
  @Prop({ required: false, type: [String] })
  fcmToken: string[];
  @Prop({ required: false, type: Date })
  lastVisit: Date;
  @Prop({ type: String, default: LanguageEnum.es_ES })
  language: LanguageEnum;
}
export const UserAccountSchema = SchemaFactory.createForClass(UserDocument);
