import { hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

interface TokenPayload {
  userId: string;
  role: string;
  sessionId: string;
}

export class AuthService {
  private readonly SALT_ROUNDS = 12;
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
  private readonly ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your-encryption-key';
  private readonly IV_LENGTH = 16;

  async hashPassword(password: string): Promise<string> {
    return hash(password, this.SALT_ROUNDS);
  }

  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
  }

  generateToken(payload: TokenPayload): string {
    return sign(payload, this.JWT_SECRET, { expiresIn: '1h' });
  }

  verifyToken(token: string): TokenPayload {
    return verify(token, this.JWT_SECRET) as TokenPayload;
  }

  encrypt(text: string): { iv: string; encryptedData: string } {
    const iv = randomBytes(this.IV_LENGTH);
    const cipher = createCipheriv('aes-256-cbc', Buffer.from(this.ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return {
      iv: iv.toString('hex'),
      encryptedData: encrypted.toString('hex')
    };
  }

  decrypt(encryptedData: string, iv: string): string {
    const decipher = createDecipheriv(
      'aes-256-cbc',
      Buffer.from(this.ENCRYPTION_KEY),
      Buffer.from(iv, 'hex')
    );
    let decrypted = decipher.update(Buffer.from(encryptedData, 'hex'));
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
}