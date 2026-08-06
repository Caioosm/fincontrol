import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1786023098386 implements MigrationInterface {
  name = 'InitialSchema1786023098386';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(150) NOT NULL, "email" character varying(150) NOT NULL, "telefone" character varying(20), "senha_hash" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."categorias_tipo_enum" AS ENUM('receita', 'despesa')`,
    );
    await queryRunner.query(
      `CREATE TABLE "categorias" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "usuario_id" uuid NOT NULL, "nome" character varying(80) NOT NULL, "tipo" "public"."categorias_tipo_enum" NOT NULL, "cor" character varying(7), "icone" character varying(50), "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3886a26251605c571c6b4f861fe" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_77143cef4e33a5cdcb1e7e4a8e" ON "categorias" ("usuario_id", "tipo") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."contas_tipo_enum" AS ENUM('corrente', 'poupanca', 'carteira', 'investimento')`,
    );
    await queryRunner.query(
      `CREATE TABLE "contas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "usuario_id" uuid NOT NULL, "nome" character varying(80) NOT NULL, "tipo" "public"."contas_tipo_enum" NOT NULL, "saldo_inicial" numeric(12,2) NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f5a347b0829de9a7a38cf1d052f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."gastos_fixos_recorrencia_enum" AS ENUM('mensal', 'anual')`,
    );
    await queryRunner.query(
      `CREATE TABLE "gastos_fixos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "usuario_id" uuid NOT NULL, "categoria_id" uuid NOT NULL, "descricao" character varying(150) NOT NULL, "valor_previsto" numeric(12,2) NOT NULL, "dia_vencimento" smallint NOT NULL, "recorrencia" "public"."gastos_fixos_recorrencia_enum" NOT NULL DEFAULT 'mensal', "ativo" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_30a443a3cdbb1d3f868a94ad433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."lancamentos_tipo_enum" AS ENUM('receita', 'despesa')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."lancamentos_status_enum" AS ENUM('pendente', 'pago', 'atrasado')`,
    );
    await queryRunner.query(
      `CREATE TABLE "lancamentos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "usuario_id" uuid NOT NULL, "categoria_id" uuid NOT NULL, "conta_id" uuid NOT NULL, "gasto_fixo_id" uuid, "descricao" character varying(150) NOT NULL, "valor" numeric(12,2) NOT NULL, "tipo" "public"."lancamentos_tipo_enum" NOT NULL, "data_vencimento" date NOT NULL, "data_pagamento" date, "status" "public"."lancamentos_status_enum" NOT NULL DEFAULT 'pendente', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_863ece961e659a6e426dcff9d90" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6b897023d1ce1fa5bd490d4db5" ON "lancamentos" ("usuario_id", "status") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ec326e92f80504664fa3b9ec44" ON "lancamentos" ("usuario_id", "data_vencimento") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."notificacoes_enviadas_canal_enum" AS ENUM('email', 'whatsapp')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."notificacoes_enviadas_status_enum" AS ENUM('enviado', 'falhou')`,
    );
    await queryRunner.query(
      `CREATE TABLE "notificacoes_enviadas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "lancamento_id" uuid NOT NULL, "canal" "public"."notificacoes_enviadas_canal_enum" NOT NULL, "data_envio" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."notificacoes_enviadas_status_enum" NOT NULL, CONSTRAINT "PK_2a5e4fc3fe9b41cb9b9854b6642" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "categorias" ADD CONSTRAINT "FK_7da46858c3ebb047fa03b09bb9b" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contas" ADD CONSTRAINT "FK_3b256ec1ae4debfee508cd2c4b0" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "gastos_fixos" ADD CONSTRAINT "FK_aacade3787d05462f3f9d9dd11d" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "gastos_fixos" ADD CONSTRAINT "FK_4088b7466040889c022e02eedae" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lancamentos" ADD CONSTRAINT "FK_ed418bc37e544c01c94eec6c5f0" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lancamentos" ADD CONSTRAINT "FK_434baf7634debc0b6ccd8cf4576" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lancamentos" ADD CONSTRAINT "FK_8557199511c4b9cde973881d3f1" FOREIGN KEY ("conta_id") REFERENCES "contas"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lancamentos" ADD CONSTRAINT "FK_c834f0764f6f82d850aba2dc9e5" FOREIGN KEY ("gasto_fixo_id") REFERENCES "gastos_fixos"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "notificacoes_enviadas" ADD CONSTRAINT "FK_8691c2d56a54fd22a4a4ede88c9" FOREIGN KEY ("lancamento_id") REFERENCES "lancamentos"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "notificacoes_enviadas" DROP CONSTRAINT "FK_8691c2d56a54fd22a4a4ede88c9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lancamentos" DROP CONSTRAINT "FK_c834f0764f6f82d850aba2dc9e5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lancamentos" DROP CONSTRAINT "FK_8557199511c4b9cde973881d3f1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lancamentos" DROP CONSTRAINT "FK_434baf7634debc0b6ccd8cf4576"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lancamentos" DROP CONSTRAINT "FK_ed418bc37e544c01c94eec6c5f0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "gastos_fixos" DROP CONSTRAINT "FK_4088b7466040889c022e02eedae"`,
    );
    await queryRunner.query(
      `ALTER TABLE "gastos_fixos" DROP CONSTRAINT "FK_aacade3787d05462f3f9d9dd11d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contas" DROP CONSTRAINT "FK_3b256ec1ae4debfee508cd2c4b0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categorias" DROP CONSTRAINT "FK_7da46858c3ebb047fa03b09bb9b"`,
    );
    await queryRunner.query(`DROP TABLE "notificacoes_enviadas"`);
    await queryRunner.query(`DROP TYPE "public"."notificacoes_enviadas_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."notificacoes_enviadas_canal_enum"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_ec326e92f80504664fa3b9ec44"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_6b897023d1ce1fa5bd490d4db5"`);
    await queryRunner.query(`DROP TABLE "lancamentos"`);
    await queryRunner.query(`DROP TYPE "public"."lancamentos_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."lancamentos_tipo_enum"`);
    await queryRunner.query(`DROP TABLE "gastos_fixos"`);
    await queryRunner.query(`DROP TYPE "public"."gastos_fixos_recorrencia_enum"`);
    await queryRunner.query(`DROP TABLE "contas"`);
    await queryRunner.query(`DROP TYPE "public"."contas_tipo_enum"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_77143cef4e33a5cdcb1e7e4a8e"`);
    await queryRunner.query(`DROP TABLE "categorias"`);
    await queryRunner.query(`DROP TYPE "public"."categorias_tipo_enum"`);
    await queryRunner.query(`DROP TABLE "usuarios"`);
  }
}
