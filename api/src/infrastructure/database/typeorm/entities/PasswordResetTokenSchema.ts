import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UsuarioSchema } from './UsuarioSchema.js';

@Entity('password_reset_tokens')
export class PasswordResetTokenSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'usuario_id' })
  usuarioId: string;

  @Column({ type: 'varchar', length: 255, name: 'token_hash', unique: true })
  tokenHash: string;

  @Column({ type: 'timestamp', name: 'expira_em' })
  expiraEm: Date;

  @Column({ type: 'boolean', default: false })
  usado: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => UsuarioSchema, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: UsuarioSchema;
}
