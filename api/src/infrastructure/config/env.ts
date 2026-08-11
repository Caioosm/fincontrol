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

  // JWT & Auth
  JWT_SECRET: str({ default: 'changeme' }),
  JWT_ACCESS_EXPIRES_IN: str({ default: '15m' }),
  REFRESH_TOKEN_EXPIRES_IN_DAYS: num({ default: 7 }),

  // Google OAuth
  GOOGLE_CLIENT_ID: str({ default: '' }),
  GOOGLE_CLIENT_SECRET: str({ default: '' }),

  // MFA
  MFA_ENCRYPTION_KEY: str({ default: 'changeme' }),

  // Token expiration
  EMAIL_VERIFICATION_EXPIRES_IN_HOURS: num({ default: 24 }),
  PASSWORD_RESET_EXPIRES_IN_MINUTES: num({ default: 30 }),

  // Rate limiting
  RATE_LIMIT_LOGIN_MAX_ATTEMPTS: num({ default: 5 }),
  RATE_LIMIT_LOGIN_WINDOW_MINUTES: num({ default: 15 }),

  // Frontend
  FRONTEND_URL: str({ default: 'http://localhost:5173' }),

  // SMTP (opcionais no MVP)
  SMTP_HOST: str({ default: '' }),
  SMTP_PORT: port({ default: 587 }),
  SMTP_USER: str({ default: '' }),
  SMTP_PASSWORD: str({ default: '' }),
  SMTP_FROM: str({ default: 'fincontrol@example.com' }),

  // WhatsApp (opcionais no MVP)
  EVOLUTION_API_URL: str({ default: 'http://localhost:8080' }),
  EVOLUTION_API_KEY: str({ default: 'changeme' }),

  // Configurações de negócio
  DIAS_AVISO_VENCIMENTO: num({ default: 3 }),
});
