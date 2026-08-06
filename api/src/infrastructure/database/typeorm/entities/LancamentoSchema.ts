import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { StatusLancamento } from '../../../../domain/enums/StatusLancamento.js';
import { TipoLancamento } from '../../../../domain/enums/TipoLancamento.js';
import { UsuarioSchema } from './UsuarioSchema.js';
import { CategoriaSchema } from './CategoriaSchema.js';
import { ContaSchema } from './ContaSchema.js';
import { GastoFixoSchema } from './GastoFixoSchema.js';

@Entity('lancamentos')
@Index(['usuarioId', 'dataVencimento'])
@Index(['usuarioId', 'status'])
export class LancamentoSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'usuario_id' })
  usuarioId: string;

  @Column({ type: 'uuid', name: 'categoria_id' })
  categoriaId: string;

  @Column({ type: 'uuid', name: 'conta_id' })
  contaId: string;

  @Column({ type: 'uuid', name: 'gasto_fixo_id', nullable: true })
  gastoFixoId: string | null;

  @Column({ type: 'varchar', length: 150 })
  descricao: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  valor: number;

  @Column({ type: 'enum', enum: TipoLancamento })
  tipo: TipoLancamento;

  @Column({ type: 'date', name: 'data_vencimento' })
  dataVencimento: Date;

  @Column({ type: 'date', name: 'data_pagamento', nullable: true })
  dataPagamento: Date | null;

  @Column({ type: 'enum', enum: StatusLancamento, default: StatusLancamento.PENDENTE })
  status: StatusLancamento;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => UsuarioSchema, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: UsuarioSchema;

  @ManyToOne(() => CategoriaSchema, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'categoria_id' })
  categoria: CategoriaSchema;

  @ManyToOne(() => ContaSchema, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'conta_id' })
  conta: ContaSchema;

  @ManyToOne(() => GastoFixoSchema, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'gasto_fixo_id' })
  gastoFixo: GastoFixoSchema | null;
}
