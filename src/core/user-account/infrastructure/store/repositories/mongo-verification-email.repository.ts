import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
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
    entity: EmailAccountVerification,
  ): Promise<EmailAccountVerification> {
    const emailAccountVerificationDocument =
      await new this.accEmailVerificationModel({
        userAccountId: entity.userAccountId,
        email: entity.email,
        expiresAt: entity.expiresAt,
        verificationToken: entity.verificationToken,
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
    entity: EmailAccountVerification,
  ): Promise<EmailAccountVerification> {
    const model = this.mapper.toModel(entity);
    const emailAccountVerificationDocument =
      await this.accEmailVerificationModel.findOneAndUpdate(
        { id: entity.id },
        { $set: model },
        { new: true },
      );
    return emailAccountVerificationDocument
      ? this.mapper.toEntity(emailAccountVerificationDocument)
      : undefined;
  }
}
