import Handlebars from "handlebars";
import { Injectable } from "@nestjs/common";
import { MailBuilderService } from "../domain/mail-builder.service";
import { EmailVariables } from "../domain/email.types";

@Injectable()
export class HandlebarsMailBuilderService implements MailBuilderService {
  constructor() {}
  build(sourceTemplate: string, variables?: EmailVariables): string {
    return Handlebars.compile(sourceTemplate)(variables);
  }
}
