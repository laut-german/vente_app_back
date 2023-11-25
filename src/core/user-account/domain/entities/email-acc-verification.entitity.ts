import { StatusEmailVerificationEnum } from "@users/domain/enums/status-email-verification.enum";

export interface EmailAccountProps {
  id?: string;
  userAccountId: string;
  email: string;
  verificationToken: string;
  status?: StatusEmailVerificationEnum;
  createdAt?: Date;
  expiresAt?: Date;
}

export class EmailAccountVerification {
  constructor(private props: EmailAccountProps) {}

  get id() {
    return this.props.id;
  }

  get userAccountId() {
    return this.props.userAccountId;
  }

  get email() {
    return this.props.email;
  }

  get verificationToken() {
    return this.props.verificationToken;
  }

  get status() {
    return this.props.status;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get expiresAt() {
    return this.props.expiresAt;
  }

  set userAccount(userAccountId: string) {
    this.props.userAccountId = userAccountId;
  }

  set email(email: string) {
    this.props.email = email;
  }

  set verificationToken(token: string) {
    this.props.verificationToken = token;
  }

  set status(status: StatusEmailVerificationEnum) {
    this.props.status = status;
  }

  set expiresAt(expiresAt: Date) {
    this.props.expiresAt = expiresAt;
  }

  update(props: Partial<EmailAccountVerification>) {
    this.props.email = props.email || this.props.email;
    this.props.verificationToken =
      props.verificationToken || this.props.verificationToken;
    this.props.status = props.status || this.props.status;
    this.props.expiresAt = props.expiresAt || this.props.expiresAt;
  }
  static create(props: EmailAccountProps): EmailAccountVerification {
    return new EmailAccountVerification({
      ...props,
      expiresAt: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    });
  }
}
