import { Conta } from '../../domain/entities/Conta.js';

export interface IContaRepository {
  criar(conta: Conta): Promise<Conta>;
  buscarPorId(id: string): Promise<Conta | null>;
  listarPorUsuario(usuarioId: string): Promise<Conta[]>;
  atualizar(conta: Conta): Promise<Conta>;
  deletar(id: string): Promise<void>;
}
