import { Usuario } from '../../domain/entities/Usuario.js';

export interface IUsuarioRepository {
  criar(usuario: Usuario): Promise<Usuario>;
  buscarPorId(id: string): Promise<Usuario | null>;
  buscarPorEmail(email: string): Promise<Usuario | null>;
  buscarPorGoogleId(googleId: string): Promise<Usuario | null>;
  atualizar(usuario: Usuario): Promise<Usuario>;
  deletar(id: string): Promise<void>;
}
