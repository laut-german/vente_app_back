import { MailerService } from "../domain/mailer.service";
import { Injectable, Logger } from "@nestjs/common";
import { EmailMessage, Response } from "../domain/email.types";
import { ConfigAux } from "../../utils/config.aux";
import Mailjet from "node-mailjet";
import { readFileSync } from "fs";
import { join } from "path";

@Injectable()
export class MailjetMailerService implements MailerService {
  private readonly logger = new Logger(MailjetMailerService.name);
  private readonly configService = new ConfigAux(process.env);
  private readonly client: Mailjet;

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

  public async send(messageDetail: EmailMessage): Promise<Response> {
    try {
      const message = this.prepareMessage(messageDetail);
      const result = await this.client.post("send").request({
        Messages: [message],
        SandboxMode: false,
      });
      return toResponse(result);
    } catch (error) {
      this.logger.error(error as Error);
      throw error;
    }
  }

  readHtmlTemplate(filename: string): string {
    return readFileSync(
      join(__dirname, `../../emails/${filename}.html`),
      "utf8",
    );
  }

  private prepareMessage(messageDetail: EmailMessage) {
    return {
      ...messageDetail,
      from: { email: "laut.german@gmail.com" },
    };
  }
}
function toResponse(result): Response {
  return {
    status: result.response.status,
    statusText: result.response.statusText,
  };
}
