import { JwtService } from '@nestjs/jwt';

export class JwtProvider {
  private jwt = new JwtService({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: process.env.JWT_EXPIRES },
  });

  public async generateToken(data: any): Promise<string> {
    return this.jwt.sign(data);
  }
}
