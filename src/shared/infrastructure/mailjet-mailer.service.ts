import { MailerService } from "../domain/mailer.service";
import { Injectable, Logger } from "@nestjs/common";
import { EmailMessage } from "../domain/email.types";
import { ConfigAux } from "../../utils/config.aux";
import Mailjet from "node-mailjet";

@Injectable()
export class MailjetMailerService implements MailerService {
  private readonly logger = new Logger(MailjetMailerService.name);
  private readonly client: Mailjet;
  private readonly configService = new ConfigAux(process.env);

  constructor() {
    this.logger.log("mailjet-mailer");
    this.client = new Mailjet({
      apiKey: this.configService.getValue("MAILJET_APIKEY_PUBLIC"),
      apiSecret: this.configService.getValue("MAILJET_APIKEY_PRIVATE"),
      config: {
        host: "api.mailjet.com",
        version: "v3.1",
        output: "json",
      },
    });
    if (!this.client) {
      throw new Error("Failed to initialize Mailjet client.");
    }
  }

  public async send(messageDetail: EmailMessage) {
    this.logger.log(messageDetail);
    return null;
  }
}
