export class Usuario {
  id: string;
  nome: string;
  email: string;
  telefone: string | null;
  senhaHash: string | null;
  emailVerificado: boolean;
  googleId: string | null;
  mfaHabilitado: boolean;
  mfaSecret: string | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(params: {
    id?: string;
    nome: string;
    email: string;
    telefone?: string | null;
    senhaHash?: string | null;
    emailVerificado?: boolean;
    googleId?: string | null;
    mfaHabilitado?: boolean;
    mfaSecret?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = params.id ?? '';
    this.nome = params.nome;
    this.email = params.email;
    this.telefone = params.telefone ?? null;
    this.senhaHash = params.senhaHash ?? null;
    this.emailVerificado = params.emailVerificado ?? false;
    this.googleId = params.googleId ?? null;
    this.mfaHabilitado = params.mfaHabilitado ?? false;
    this.mfaSecret = params.mfaSecret ?? null;
    this.createdAt = params.createdAt ?? new Date();
    this.updatedAt = params.updatedAt ?? new Date();
  }

  /** Verifica se o usuário tem login via Google. */
  isGoogleUser(): boolean {
    return this.googleId !== null;
  }

  /** Verifica se o usuário pode fazer login (email verificado). */
  podeLogar(): boolean {
    return this.emailVerificado;
  }
}
