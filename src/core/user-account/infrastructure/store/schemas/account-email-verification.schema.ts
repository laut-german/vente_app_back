import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { StatusEmailVerificationEnum } from "@users/domain/enums/status-email-verification.enum";

export interface AccountEmailVerificationModel {
  id: string;
  email: string;
  verificationToken: string;
  status: string;
  expiresAt: Date;
}
@Schema({
  collection: "account_email_verifications",
  timestamps: true,
})
export class AccountEmailVerificationDocument extends Document {
  @Prop({
    required: true,
    type: String,
    unique: true,
    default: () => uuidv4(),
  })
  id: string;

  @Prop({
    required: true,
    type: String,
    index: true,
    ref: "UserDocument",
  })
  userAccountId: string;

  @Prop({ required: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  verificationToken: string;

  @Prop({
    required: true,
    type: String,
    enum: StatusEmailVerificationEnum,
    default: StatusEmailVerificationEnum.Unverified,
  })
  status: StatusEmailVerificationEnum;

  @Prop({ required: true, type: Date })
  expiresAt: Date;
}

export const EmailVerificationSchema = SchemaFactory.createForClass(
  AccountEmailVerificationDocument,
);
