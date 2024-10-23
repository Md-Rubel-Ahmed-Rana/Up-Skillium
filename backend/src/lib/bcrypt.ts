import bcrypt from "bcrypt";

class Bcrypt {
  async hash(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 12);
    return hashedPassword;
  }
  async compare(password: string, encryptedPassword: string): Promise<boolean> {
    const isMatchedPassword = await bcrypt.compare(password, encryptedPassword);
    return isMatchedPassword;
  }
}

export const BcryptInstance = new Bcrypt();
