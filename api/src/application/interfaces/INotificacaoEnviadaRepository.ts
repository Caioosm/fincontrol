import { NotificacaoEnviada } from '../../domain/entities/NotificacaoEnviada.js';

export interface INotificacaoEnviadaRepository {
  criar(notificacao: NotificacaoEnviada): Promise<NotificacaoEnviada>;
  buscarPorLancamentoEData(lancamentoId: string, data: Date): Promise<NotificacaoEnviada[]>;
  listarPorLancamento(lancamentoId: string): Promise<NotificacaoEnviada[]>;
}
