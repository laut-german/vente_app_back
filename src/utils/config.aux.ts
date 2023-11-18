export class ConfigAux {
  constructor(private env: { [k: string]: string | undefined }) {
  }

  public getValue(key: string): string {
    const value = this.env[key];
    if (!value) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }

  public getFirebaseConfig(): {
    projectId: string;
    clientEmail: string;
    privateKey: string;
  } {
    return {
      projectId: this.getValue("FIREBASE_PROJECT_ID"),
      clientEmail: this.getValue("FIREBASE_CLIENT_EMAIL"),
      privateKey: this.getValue("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n"),
    };
  }
}
