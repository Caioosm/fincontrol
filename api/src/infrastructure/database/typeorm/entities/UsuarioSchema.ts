import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('usuarios')
export class UsuarioSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  nome: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefone: string | null;

  @Column({ type: 'varchar', length: 255, name: 'senha_hash', nullable: true })
  senhaHash: string | null;

  @Column({ type: 'boolean', name: 'email_verificado', default: false })
  emailVerificado: boolean;

  @Column({ type: 'varchar', length: 100, name: 'google_id', nullable: true, unique: true })
  googleId: string | null;

  @Column({ type: 'boolean', name: 'mfa_habilitado', default: false })
  mfaHabilitado: boolean;

  @Column({ type: 'varchar', length: 255, name: 'mfa_secret', nullable: true })
  mfaSecret: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
