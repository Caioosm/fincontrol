import { GastoFixo } from '../../domain/entities/GastoFixo.js';

export interface IGastoFixoRepository {
  criar(gastoFixo: GastoFixo): Promise<GastoFixo>;
  buscarPorId(id: string): Promise<GastoFixo | null>;
  listarPorUsuario(usuarioId: string, apenasAtivos?: boolean): Promise<GastoFixo[]>;
  listarAtivos(): Promise<GastoFixo[]>;
  atualizar(gastoFixo: GastoFixo): Promise<GastoFixo>;
}
