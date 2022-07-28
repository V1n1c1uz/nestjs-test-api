import * as bcrypt from 'bcrypt';

export class HashProvider {
  async generateHash(plain: string): Promise<string> {
    return bcrypt.hash(plain, 8);
  }

  async compareHash(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
