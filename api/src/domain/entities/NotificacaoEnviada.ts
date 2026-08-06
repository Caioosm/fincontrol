import { CanalNotificacao } from '../enums/CanalNotificacao.js';
import { StatusNotificacao } from '../enums/StatusNotificacao.js';

export class NotificacaoEnviada {
  id: string;
  lancamentoId: string;
  canal: CanalNotificacao;
  dataEnvio: Date;
  status: StatusNotificacao;

  constructor(params: {
    id?: string;
    lancamentoId: string;
    canal: CanalNotificacao;
    dataEnvio?: Date;
    status: StatusNotificacao;
  }) {
    this.id = params.id ?? '';
    this.lancamentoId = params.lancamentoId;
    this.canal = params.canal;
    this.dataEnvio = params.dataEnvio ?? new Date();
    this.status = params.status;
  }
}
