export class Usuario {
  id: string;
  nome: string;
  email: string;
  telefone: string | null;
  senhaHash: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(params: {
    id?: string;
    nome: string;
    email: string;
    telefone?: string | null;
    senhaHash: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = params.id ?? '';
    this.nome = params.nome;
    this.email = params.email;
    this.telefone = params.telefone ?? null;
    this.senhaHash = params.senhaHash;
    this.createdAt = params.createdAt ?? new Date();
    this.updatedAt = params.updatedAt ?? new Date();
  }
}
