import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Recorrencia } from '../../../../domain/enums/Recorrencia.js';
import { UsuarioSchema } from './UsuarioSchema.js';
import { CategoriaSchema } from './CategoriaSchema.js';

@Entity('gastos_fixos')
export class GastoFixoSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'usuario_id' })
  usuarioId: string;

  @Column({ type: 'uuid', name: 'categoria_id' })
  categoriaId: string;

  @Column({ type: 'varchar', length: 150 })
  descricao: string;

  @Column({ type: 'numeric', precision: 12, scale: 2, name: 'valor_previsto' })
  valorPrevisto: number;

  @Column({ type: 'smallint', name: 'dia_vencimento' })
  diaVencimento: number;

  @Column({ type: 'enum', enum: Recorrencia, default: Recorrencia.MENSAL })
  recorrencia: Recorrencia;

  @Column({ type: 'boolean', default: true })
  ativo: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => UsuarioSchema, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: UsuarioSchema;

  @ManyToOne(() => CategoriaSchema, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'categoria_id' })
  categoria: CategoriaSchema;
}
