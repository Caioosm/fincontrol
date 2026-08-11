export class PasswordResetToken {
  id: string;
  usuarioId: string;
  tokenHash: string;
  expiraEm: Date;
  usado: boolean;
  createdAt: Date;

  constructor(params: {
    id?: string;
    usuarioId: string;
    tokenHash: string;
    expiraEm: Date;
    usado?: boolean;
    createdAt?: Date;
  }) {
    this.id = params.id ?? '';
    this.usuarioId = params.usuarioId;
    this.tokenHash = params.tokenHash;
    this.expiraEm = params.expiraEm;
    this.usado = params.usado ?? false;
    this.createdAt = params.createdAt ?? new Date();
  }

  /** Verifica se o token é válido (não expirado e não usado). */
  estaValido(agora: Date = new Date()): boolean {
    return !this.usado && this.expiraEm > agora;
  }

  /** Marca o token como usado (uso único). */
  marcarComoUsado(): void {
    this.usado = true;
  }
}
