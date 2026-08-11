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

@Entity('login_attempts')
@Index(['emailTentado', 'ip'])
export class LoginAttemptSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'usuario_id', nullable: true })
  usuarioId: string | null;

  @Column({ type: 'varchar', length: 150, name: 'email_tentado' })
  emailTentado: string;

  @Column({ type: 'varchar', length: 45 })
  ip: string;

  @Column({ type: 'varchar', length: 255, name: 'user_agent', nullable: true })
  userAgent: string | null;

  @Column({ type: 'boolean' })
  sucesso: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => UsuarioSchema, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'usuario_id' })
  usuario: UsuarioSchema | null;
}
