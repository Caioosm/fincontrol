import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TipoConta } from '../../../../domain/enums/TipoConta.js';
import { UsuarioSchema } from './UsuarioSchema.js';

@Entity('contas')
export class ContaSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'usuario_id' })
  usuarioId: string;

  @Column({ type: 'varchar', length: 80 })
  nome: string;

  @Column({ type: 'enum', enum: TipoConta })
  tipo: TipoConta;

  @Column({ type: 'numeric', precision: 12, scale: 2, name: 'saldo_inicial', default: 0 })
  saldoInicial: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => UsuarioSchema, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: UsuarioSchema;
}
