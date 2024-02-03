import { EmailVariables } from "./email.types";
export const MAIL_BUILDER_SERVICE = Symbol();

export interface MailBuilderService {
  build(sourceTemplate: string, variables?: EmailVariables): string;
}
