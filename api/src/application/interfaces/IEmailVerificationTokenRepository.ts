import { EmailVerificationToken } from '../../domain/entities/EmailVerificationToken.js';

export interface IEmailVerificationTokenRepository {
  criar(token: EmailVerificationToken): Promise<EmailVerificationToken>;
  buscarPorTokenHash(tokenHash: string): Promise<EmailVerificationToken | null>;
  invalidarTokensDoUsuario(usuarioId: string): Promise<void>;
}
