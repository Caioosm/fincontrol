export class RefreshToken {
  id: string;
  usuarioId: string;
  tokenHash: string;
  userAgent: string | null;
  ip: string | null;
  expiraEm: Date;
  revogado: boolean;
  substituidoPor: string | null;
  createdAt: Date;

  constructor(params: {
    id?: string;
    usuarioId: string;
    tokenHash: string;
    userAgent?: string | null;
    ip?: string | null;
    expiraEm: Date;
    revogado?: boolean;
    substituidoPor?: string | null;
    createdAt?: Date;
  }) {
    this.id = params.id ?? '';
    this.usuarioId = params.usuarioId;
    this.tokenHash = params.tokenHash;
    this.userAgent = params.userAgent ?? null;
    this.ip = params.ip ?? null;
    this.expiraEm = params.expiraEm;
    this.revogado = params.revogado ?? false;
    this.substituidoPor = params.substituidoPor ?? null;
    this.createdAt = params.createdAt ?? new Date();
  }

  /** Verifica se o token está expirado. */
  estaExpirado(agora: Date = new Date()): boolean {
    return this.expiraEm < agora;
  }

  /** Verifica se o token é utilizável (não revogado e não expirado). */
  estaValido(agora: Date = new Date()): boolean {
    return !this.revogado && !this.estaExpirado(agora);
  }

  /** Revoga o token, opcionalmente registrando qual token o substituiu (rotation). */
  revogar(substituidoPor?: string): void {
    this.revogado = true;
    if (substituidoPor) {
      this.substituidoPor = substituidoPor;
    }
  }
}
