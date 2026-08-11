import { RefreshToken } from '../../domain/entities/RefreshToken.js';

export interface IRefreshTokenRepository {
  criar(token: RefreshToken): Promise<RefreshToken>;
  buscarPorTokenHash(tokenHash: string): Promise<RefreshToken | null>;
  buscarAtivosDoUsuario(usuarioId: string): Promise<RefreshToken[]>;
  atualizar(token: RefreshToken): Promise<RefreshToken>;
  revogarTodosDoUsuario(usuarioId: string): Promise<void>;
}
