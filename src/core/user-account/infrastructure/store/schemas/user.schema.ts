import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

@Schema({ collection: "users", timestamps: true })
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
  @Prop({ type: String, default: "es" })
  language: string;
}
export const UserSchema = SchemaFactory.createForClass(UserDocument);
