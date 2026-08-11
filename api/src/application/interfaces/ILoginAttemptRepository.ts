import { LoginAttempt } from '../../domain/entities/LoginAttempt.js';

export interface ILoginAttemptRepository {
  criar(tentativa: LoginAttempt): Promise<LoginAttempt>;
  contarFalhasRecentes(email: string, ip: string, janela: Date): Promise<number>;
  buscarUltimoSucessoDoUsuario(usuarioId: string): Promise<LoginAttempt | null>;
}
