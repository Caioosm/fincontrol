import { StatusLancamento } from '../enums/StatusLancamento.js';
import { TipoLancamento } from '../enums/TipoLancamento.js';

export class Lancamento {
  id: string;
  usuarioId: string;
  categoriaId: string;
  contaId: string;
  gastoFixoId: string | null;
  descricao: string;
  valor: number;
  tipo: TipoLancamento;
  dataVencimento: Date;
  dataPagamento: Date | null;
  status: StatusLancamento;
  createdAt: Date;

  constructor(params: {
    id?: string;
    usuarioId: string;
    categoriaId: string;
    contaId: string;
    gastoFixoId?: string | null;
    descricao: string;
    valor: number;
    tipo: TipoLancamento;
    dataVencimento: Date;
    dataPagamento?: Date | null;
    status?: StatusLancamento;
    createdAt?: Date;
  }) {
    this.id = params.id ?? '';
    this.usuarioId = params.usuarioId;
    this.categoriaId = params.categoriaId;
    this.contaId = params.contaId;
    this.gastoFixoId = params.gastoFixoId ?? null;
    this.descricao = params.descricao;
    this.valor = params.valor;
    this.tipo = params.tipo;
    this.dataVencimento = params.dataVencimento;
    this.dataPagamento = params.dataPagamento ?? null;
    this.status = params.status ?? StatusLancamento.PENDENTE;
    this.createdAt = params.createdAt ?? new Date();
  }

  /** Verifica se o lançamento está atrasado com base na data atual. */
  estaAtrasado(hoje: Date = new Date()): boolean {
    return this.status === StatusLancamento.PENDENTE && this.dataVencimento < hoje;
  }

  /** Marca o lançamento como pago, registrando a data de pagamento. */
  marcarComoPago(dataPagamento: Date = new Date()): void {
    this.status = StatusLancamento.PAGO;
    this.dataPagamento = dataPagamento;
  }
}
