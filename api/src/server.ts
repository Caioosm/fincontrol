import 'reflect-metadata';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { env } from './infrastructure/config/env.js';
import { logger } from './infrastructure/config/logger.js';
import { AppDataSource } from './infrastructure/database/data-source.js';

const app = express();

// ── Security middlewares ──────────────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: env.NODE_ENV === 'production' ? [] : '*',
    credentials: true,
  }),
);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

// ── Body parsers ──────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Health check ──────────────────────────────────────────────────────
app.get('/api/v1/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── Bootstrap ─────────────────────────────────────────────────────────
async function bootstrap() {
  try {
    await AppDataSource.initialize();
    logger.info('Conexão com o banco de dados estabelecida');

    app.listen(env.PORT, () => {
      logger.info(`Servidor rodando em http://localhost:${env.PORT}`);
      logger.info(`Health check: http://localhost:${env.PORT}/api/v1/health`);
    });
  } catch (error) {
    logger.error(error, 'Falha ao iniciar o servidor');
    process.exit(1);
  }
}

bootstrap();

export { app };
