import { Recorrencia } from '../enums/Recorrencia.js';

export class GastoFixo {
  id: string;
  usuarioId: string;
  categoriaId: string;
  descricao: string;
  valorPrevisto: number;
  diaVencimento: number;
  recorrencia: Recorrencia;
  ativo: boolean;
  createdAt: Date;

  constructor(params: {
    id?: string;
    usuarioId: string;
    categoriaId: string;
    descricao: string;
    valorPrevisto: number;
    diaVencimento: number;
    recorrencia?: Recorrencia;
    ativo?: boolean;
    createdAt?: Date;
  }) {
    this.id = params.id ?? '';
    this.usuarioId = params.usuarioId;
    this.categoriaId = params.categoriaId;
    this.descricao = params.descricao;
    this.valorPrevisto = params.valorPrevisto;
    this.diaVencimento = params.diaVencimento;
    this.recorrencia = params.recorrencia ?? Recorrencia.MENSAL;
    this.ativo = params.ativo ?? true;
    this.createdAt = params.createdAt ?? new Date();
  }

  /** Desativa o gasto fixo sem apagar — preserva histórico de lançamentos gerados. */
  desativar(): void {
    this.ativo = false;
  }
}
