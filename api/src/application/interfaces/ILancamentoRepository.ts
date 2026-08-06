import { Lancamento } from '../../domain/entities/Lancamento.js';

export interface FiltrosLancamento {
  mes?: string; // formato "2026-08"
  status?: string;
  categoriaId?: string;
}

export interface ILancamentoRepository {
  criar(lancamento: Lancamento): Promise<Lancamento>;
  buscarPorId(id: string): Promise<Lancamento | null>;
  listarPorUsuario(usuarioId: string, filtros?: FiltrosLancamento): Promise<Lancamento[]>;
  atualizar(lancamento: Lancamento): Promise<Lancamento>;
  deletar(id: string): Promise<void>;
}
