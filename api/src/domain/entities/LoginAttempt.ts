export class LoginAttempt {
  id: string;
  usuarioId: string | null;
  emailTentado: string;
  ip: string;
  userAgent: string | null;
  sucesso: boolean;
  createdAt: Date;

  constructor(params: {
    id?: string;
    usuarioId?: string | null;
    emailTentado: string;
    ip: string;
    userAgent?: string | null;
    sucesso: boolean;
    createdAt?: Date;
  }) {
    this.id = params.id ?? '';
    this.usuarioId = params.usuarioId ?? null;
    this.emailTentado = params.emailTentado;
    this.ip = params.ip;
    this.userAgent = params.userAgent ?? null;
    this.sucesso = params.sucesso;
    this.createdAt = params.createdAt ?? new Date();
  }
}
