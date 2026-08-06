import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { TipoLancamento } from '../../../../domain/enums/TipoLancamento.js';
import { UsuarioSchema } from './UsuarioSchema.js';

@Entity('categorias')
@Index(['usuarioId', 'tipo'])
export class CategoriaSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'usuario_id' })
  usuarioId: string;

  @Column({ type: 'varchar', length: 80 })
  nome: string;

  @Column({ type: 'enum', enum: TipoLancamento })
  tipo: TipoLancamento;

  @Column({ type: 'varchar', length: 7, nullable: true })
  cor: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  icone: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => UsuarioSchema, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: UsuarioSchema;
}
