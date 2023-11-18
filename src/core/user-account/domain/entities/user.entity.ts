export interface UserProps {
  id?: string;
  uid?: string;
  name: string;
  email: string;
  profilePicture?: string;
  language: string;
  password?: string;
}

export class User {
  constructor(private props: UserProps) {}

  get name() {
    return this.props.name;
  }

  private set name(name: string) {
    this.props.name = name;
  }

  get email() {
    return this.props.email;
  }

  private set email(email: string) {
    this.props.email = email;
  }

  get profilePicture() {
    return this.props.profilePicture;
  }

  private set profilePicture(image: string) {
    this.props.profilePicture = image;
  }

  get language() {
    return this.props.language;
  }

  get password() {
    return this.props.password;
  }

  private set language(language: string) {
    this.props.language = language;
  }

  get id() {
    return this.props.id;
  }

  get uid() {
    return this.props.uid;
  }

  private set id(uid: string) {
    this.props.id = uid;
  }
  update(props: Partial<User>) {
    this.name = props.name || this.props.name;
    this.email = props.email || this.props.email;
  }
  static create(props: UserProps): User {
    return new User({
      ...props,
    });
  }
}
