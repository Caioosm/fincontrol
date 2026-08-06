import 'reflect-metadata';
import { AppDataSource } from '../data-source.js';
import { UsuarioSchema } from '../typeorm/entities/UsuarioSchema.js';
import { CategoriaSchema } from '../typeorm/entities/CategoriaSchema.js';
import { TipoLancamento } from '../../../domain/enums/TipoLancamento.js';
import { logger } from '../../config/logger.js';

const DEV_USER = {
  nome: 'Usuário Dev',
  email: 'dev@fincontrol.local',
  senhaHash: '$2b$10$placeholder.hash.for.dev.user.only', // placeholder — será substituído na Fase 2 (auth)
};

interface CategoriaSeed {
  nome: string;
  tipo: TipoLancamento;
  cor: string;
  icone: string;
}

const CATEGORIAS_DESPESA: CategoriaSeed[] = [
  { nome: 'Alimentação', tipo: TipoLancamento.DESPESA, cor: '#FF6B6B', icone: 'utensils' },
  { nome: 'Transporte', tipo: TipoLancamento.DESPESA, cor: '#4ECDC4', icone: 'car' },
  { nome: 'Moradia', tipo: TipoLancamento.DESPESA, cor: '#45B7D1', icone: 'home' },
  { nome: 'Lazer', tipo: TipoLancamento.DESPESA, cor: '#96CEB4', icone: 'gamepad-2' },
  { nome: 'Saúde', tipo: TipoLancamento.DESPESA, cor: '#D4A5A5', icone: 'heart-pulse' },
  { nome: 'Educação', tipo: TipoLancamento.DESPESA, cor: '#9B59B6', icone: 'graduation-cap' },
  { nome: 'Assinaturas', tipo: TipoLancamento.DESPESA, cor: '#F39C12', icone: 'repeat' },
];

const CATEGORIAS_RECEITA: CategoriaSeed[] = [
  { nome: 'Salário', tipo: TipoLancamento.RECEITA, cor: '#2ECC71', icone: 'banknote' },
  { nome: 'Freelance', tipo: TipoLancamento.RECEITA, cor: '#1ABC9C', icone: 'laptop' },
  { nome: 'Outros', tipo: TipoLancamento.RECEITA, cor: '#3498DB', icone: 'circle-plus' },
];

async function seed(): Promise<void> {
  await AppDataSource.initialize();
  logger.info('Conexão com banco estabelecida para seed');

  const usuarioRepo = AppDataSource.getRepository(UsuarioSchema);
  const categoriaRepo = AppDataSource.getRepository(CategoriaSchema);

  // 1. Criar ou buscar usuário dev
  let usuario = await usuarioRepo.findOne({ where: { email: DEV_USER.email } });

  if (!usuario) {
    usuario = usuarioRepo.create(DEV_USER);
    usuario = await usuarioRepo.save(usuario);
    logger.info({ id: usuario.id }, 'Usuário dev criado');
  } else {
    logger.info({ id: usuario.id }, 'Usuário dev já existe');
  }

  // 2. Inserir categorias padrão (se ainda não existirem)
  const allCategorias = [...CATEGORIAS_DESPESA, ...CATEGORIAS_RECEITA];
  let created = 0;

  for (const cat of allCategorias) {
    const exists = await categoriaRepo.findOne({
      where: { usuarioId: usuario.id, nome: cat.nome },
    });

    if (!exists) {
      const nova = categoriaRepo.create({
        usuarioId: usuario.id,
        nome: cat.nome,
        tipo: cat.tipo,
        cor: cat.cor,
        icone: cat.icone,
      });
      await categoriaRepo.save(nova);
      created++;
    }
  }

  logger.info(
    { total: allCategorias.length, created, skipped: allCategorias.length - created },
    'Seed de categorias finalizado',
  );

  await AppDataSource.destroy();
}

seed().catch((err) => {
  logger.error(err, 'Erro ao executar seed');
  process.exit(1);
});
