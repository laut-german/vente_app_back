type EmailMessageContact = {
  email: string;
  name?: string;
};

type VariableValue = string | number | undefined | boolean;

export type EmailVariables = Record<
  string,
  VariableValue | Record<string, VariableValue>[]
>;

export type EmailSubject = string | undefined;

export type EmailMessage = {
  /**
   * Must be a valid, activated and registered sender for this account.
   */
  from?: EmailMessageContact;

  /**
   * Collection of recipients, each presented as a JSON object
   */
  to: EmailMessageContact[];
  cc?: EmailMessageContact[];
  bcc?: EmailMessageContact[];
  templateErrorReporting?: { email: string };
  /**
   * Variables used for personalization and/or template language in the message.
   */
  variables?: EmailVariables;

  /**
   * Activates the template language processing.
   * By default the template language processing is deactivated.
   * Use <code>True</code>True to activate.
   */
  templateLanguage?: boolean;
  subject?: string;

  /**
   * The Template ID to be used as email content. Overrides the HTML/Text parts if any.
   * MANDATORY IF NO HTML/TEXT - MAX TEMPLATEID: 1
   */
  templateID?: number;

  /**
   * Provides the Text part of the message
   * Mandatory if the HTML or TemplateID parameter is not specified
   * MANDATORY IF NO HTML - MAX PARTS: 1
   */
  textPart?: string;

  /**
   * Provides the HTML part of the message
   * Mandatory if the Text or TemplateID parameter is not specified
   * MANDATORY IF NO TEXT - MAX PARTS: 1
   */
  HTMLPart?: string;
};

export type Response = {
  status: number;
  statusText: string;
};
