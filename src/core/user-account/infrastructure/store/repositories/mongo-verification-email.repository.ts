import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { UserAccount } from "@users/domain/entities/user-account.entity";
import { UserAccountMapper } from "../schemas/user-account.mapper";
import { EmailVerificationRepository } from "@users/domain/storage/email-verification.repository";
import { EmailAccountVerification } from "@users/domain/entities/email-acc-verification.entitity";
import { AccountEmailVerificationDocument } from "@users/infrastructure/store/schemas/account-email-verification.schema";
import { AccEmailVerificationMapper } from "@users/infrastructure/store/schemas/acc-email-verification.mapper";
export class MongoVerificationEmailRepository
  implements EmailVerificationRepository
{
  private mapper = new AccEmailVerificationMapper();
  constructor(
    @InjectModel(AccountEmailVerificationDocument.name)
    private accEmailVerificationModel: Model<AccountEmailVerificationDocument>,
  ) {}

  async create(
    accEmailVerif: EmailAccountVerification,
  ): Promise<EmailAccountVerification> {
    const emailAccountVerificationDocument =
      await new this.accEmailVerificationModel({
        userAccountId: accEmailVerif.userAccountId,
        email: accEmailVerif.email,
        expiresAt: accEmailVerif.expiresAt,
        verificationToken: accEmailVerif.verificationToken,
      }).save();
    return this.mapper.toEntity(emailAccountVerificationDocument);
  }

  async getVerificationRecord(
    userAccountId: string,
  ): Promise<EmailAccountVerification> {
    const emailAccountVerificationDocument =
      await this.accEmailVerificationModel
        .findOne({
          userAccountId,
        })
        .exec();
    return emailAccountVerificationDocument
      ? this.mapper.toEntity(emailAccountVerificationDocument)
      : undefined;
  }

  async save(
    accEmailVerif: EmailAccountVerification,
  ): Promise<EmailAccountVerification> {
    const model = this.mapper.toModel(accEmailVerif);
    const emailAccountVerificationDocument =
      await this.accEmailVerificationModel.findOneAndUpdate(
        { id: accEmailVerif.id },
        { $set: model },
        { new: true },
      );
    return emailAccountVerificationDocument
      ? this.mapper.toEntity(emailAccountVerificationDocument)
      : undefined;
  }
}
