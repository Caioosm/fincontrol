import { TipoConta } from '../enums/TipoConta.js';

export class Conta {
  id: string;
  usuarioId: string;
  nome: string;
  tipo: TipoConta;
  saldoInicial: number;
  createdAt: Date;

  constructor(params: {
    id?: string;
    usuarioId: string;
    nome: string;
    tipo: TipoConta;
    saldoInicial?: number;
    createdAt?: Date;
  }) {
    this.id = params.id ?? '';
    this.usuarioId = params.usuarioId;
    this.nome = params.nome;
    this.tipo = params.tipo;
    this.saldoInicial = params.saldoInicial ?? 0;
    this.createdAt = params.createdAt ?? new Date();
  }
}
