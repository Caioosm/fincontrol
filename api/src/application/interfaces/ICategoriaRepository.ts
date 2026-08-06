import { Categoria } from '../../domain/entities/Categoria.js';

export interface ICategoriaRepository {
  criar(categoria: Categoria): Promise<Categoria>;
  buscarPorId(id: string): Promise<Categoria | null>;
  listarPorUsuario(usuarioId: string, tipo?: string): Promise<Categoria[]>;
  atualizar(categoria: Categoria): Promise<Categoria>;
  deletar(id: string): Promise<void>;
}
