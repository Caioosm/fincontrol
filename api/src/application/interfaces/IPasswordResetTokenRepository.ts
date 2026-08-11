import { PasswordResetToken } from '../../domain/entities/PasswordResetToken.js';

export interface IPasswordResetTokenRepository {
  criar(token: PasswordResetToken): Promise<PasswordResetToken>;
  buscarPorTokenHash(tokenHash: string): Promise<PasswordResetToken | null>;
  invalidarTokensDoUsuario(usuarioId: string): Promise<void>;
}
