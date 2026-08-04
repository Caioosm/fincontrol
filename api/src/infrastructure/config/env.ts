import { cleanEnv, str, port, num } from 'envalid';
import 'dotenv/config';

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'production', 'test'], default: 'development' }),
  PORT: port({ default: 3333 }),

  // Database
  DB_HOST: str({ default: 'localhost' }),
  DB_PORT: port({ default: 5432 }),
  DB_USER: str({ default: 'fincontrol' }),
  DB_PASSWORD: str({ default: 'changeme' }),
  DB_NAME: str({ default: 'fincontrol' }),

  // JWT
  JWT_SECRET: str({ default: 'changeme' }),
  JWT_EXPIRES_IN: str({ default: '7d' }),

  // SMTP (opcionais no MVP)
  SMTP_HOST: str({ default: '' }),
  SMTP_PORT: port({ default: 587 }),
  SMTP_USER: str({ default: '' }),
  SMTP_PASSWORD: str({ default: '' }),
  SMTP_FROM: str({ default: 'fincontrol@example.com' }),

  // WhatsApp (opcionais no MVP)
  // WHATSAPP_PROVIDER: str({ default: 'evolution-api' }),
  EVOLUTION_API_URL: str({ default: 'http://localhost:8080' }),
  EVOLUTION_API_KEY: str({ default: 'changeme' }),

  // Configurações de negócio
  DIAS_AVISO_VENCIMENTO: num({ default: 3 }),
});
