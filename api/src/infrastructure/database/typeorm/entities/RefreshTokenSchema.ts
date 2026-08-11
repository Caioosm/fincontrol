import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { UsuarioSchema } from './UsuarioSchema.js';

@Entity('refresh_tokens')
@Index(['usuarioId', 'revogado'])
export class RefreshTokenSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'usuario_id' })
  usuarioId: string;

  @Column({ type: 'varchar', length: 255, name: 'token_hash' })
  tokenHash: string;

  @Column({ type: 'varchar', length: 255, name: 'user_agent', nullable: true })
  userAgent: string | null;

  @Column({ type: 'varchar', length: 45, nullable: true })
  ip: string | null;

  @Column({ type: 'timestamp', name: 'expira_em' })
  expiraEm: Date;

  @Column({ type: 'boolean', default: false })
  revogado: boolean;

  @Column({ type: 'uuid', name: 'substituido_por', nullable: true })
  substituidoPor: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => UsuarioSchema, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: UsuarioSchema;
}
