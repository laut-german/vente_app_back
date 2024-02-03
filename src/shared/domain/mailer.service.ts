import { EmailMessage, Response } from "./email.types";

export const MAILER_SERVICE = Symbol();

/* References:
  https://github.com/mailjet/api-documentation/blob/master/guides/_send-api.md
  https://dev.mailjet.com/email/reference
*/

export interface MailerService {
  send(message: EmailMessage): Promise<Response>;
  readHtmlTemplate(filename: string): string;
}
