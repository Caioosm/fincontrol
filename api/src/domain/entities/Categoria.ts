import { TipoLancamento } from '../enums/TipoLancamento.js';

export class Categoria {
  id: string;
  usuarioId: string;
  nome: string;
  tipo: TipoLancamento;
  cor: string | null;
  icone: string | null;
  createdAt: Date;

  constructor(params: {
    id?: string;
    usuarioId: string;
    nome: string;
    tipo: TipoLancamento;
    cor?: string | null;
    icone?: string | null;
    createdAt?: Date;
  }) {
    this.id = params.id ?? '';
    this.usuarioId = params.usuarioId;
    this.nome = params.nome;
    this.tipo = params.tipo;
    this.cor = params.cor ?? null;
    this.icone = params.icone ?? null;
    this.createdAt = params.createdAt ?? new Date();
  }
}
