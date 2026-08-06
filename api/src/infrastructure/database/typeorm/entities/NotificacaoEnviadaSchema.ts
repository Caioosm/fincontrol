import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CanalNotificacao } from '../../../../domain/enums/CanalNotificacao.js';
import { StatusNotificacao } from '../../../../domain/enums/StatusNotificacao.js';
import { LancamentoSchema } from './LancamentoSchema.js';

@Entity('notificacoes_enviadas')
export class NotificacaoEnviadaSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'lancamento_id' })
  lancamentoId: string;

  @Column({ type: 'enum', enum: CanalNotificacao })
  canal: CanalNotificacao;

  @CreateDateColumn({ name: 'data_envio' })
  dataEnvio: Date;

  @Column({ type: 'enum', enum: StatusNotificacao })
  status: StatusNotificacao;

  @ManyToOne(() => LancamentoSchema, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lancamento_id' })
  lancamento: LancamentoSchema;
}
