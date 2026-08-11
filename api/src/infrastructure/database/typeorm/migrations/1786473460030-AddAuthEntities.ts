import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAuthEntities1786473460030 implements MigrationInterface {
  name = 'AddAuthEntities1786473460030';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "refresh_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "usuario_id" uuid NOT NULL, "token_hash" character varying(255) NOT NULL, "user_agent" character varying(255), "ip" character varying(45), "expira_em" TIMESTAMP NOT NULL, "revogado" boolean NOT NULL DEFAULT false, "substituido_por" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4800a3bb1422f53154e48e9450" ON "refresh_tokens" ("usuario_id", "revogado") `,
    );
    await queryRunner.query(
      `CREATE TABLE "password_reset_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "usuario_id" uuid NOT NULL, "token_hash" character varying(255) NOT NULL, "expira_em" TIMESTAMP NOT NULL, "usado" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_91185d86d5d7557b19abbb2868b" UNIQUE ("token_hash"), CONSTRAINT "PK_d16bebd73e844c48bca50ff8d3d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "login_attempts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "usuario_id" uuid, "email_tentado" character varying(150) NOT NULL, "ip" character varying(45) NOT NULL, "user_agent" character varying(255), "sucesso" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_070e613c8f768b1a70742705c5b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6bc88c0a92818d5eb2e4b51c0c" ON "login_attempts" ("email_tentado", "ip") `,
    );
    await queryRunner.query(
      `CREATE TABLE "email_verification_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "usuario_id" uuid NOT NULL, "token_hash" character varying(255) NOT NULL, "expira_em" TIMESTAMP NOT NULL, "usado" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_c20ed35f3d31d486aabcd0564da" UNIQUE ("token_hash"), CONSTRAINT "PK_417a095bbed21c2369a6a01ab9a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuarios" ADD "email_verificado" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(`ALTER TABLE "usuarios" ADD "google_id" character varying(100)`);
    await queryRunner.query(
      `ALTER TABLE "usuarios" ADD CONSTRAINT "UQ_7297e3daa75b842415eddc76cc5" UNIQUE ("google_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuarios" ADD "mfa_habilitado" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(`ALTER TABLE "usuarios" ADD "mfa_secret" character varying(255)`);
    await queryRunner.query(`ALTER TABLE "usuarios" ALTER COLUMN "senha_hash" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_c8349fdadc1bc791125bdd8c855" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "FK_115e409c8f4f906792458ca4e81" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "login_attempts" ADD CONSTRAINT "FK_0f257cbc2a46db2c3b4fad0e12e" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "email_verification_tokens" ADD CONSTRAINT "FK_d8ae2da606782f0397e69aaa2bf" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "email_verification_tokens" DROP CONSTRAINT "FK_d8ae2da606782f0397e69aaa2bf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "login_attempts" DROP CONSTRAINT "FK_0f257cbc2a46db2c3b4fad0e12e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "password_reset_tokens" DROP CONSTRAINT "FK_115e409c8f4f906792458ca4e81"`,
    );
    await queryRunner.query(
      `ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_c8349fdadc1bc791125bdd8c855"`,
    );
    await queryRunner.query(`ALTER TABLE "usuarios" ALTER COLUMN "senha_hash" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "mfa_secret"`);
    await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "mfa_habilitado"`);
    await queryRunner.query(
      `ALTER TABLE "usuarios" DROP CONSTRAINT "UQ_7297e3daa75b842415eddc76cc5"`,
    );
    await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "google_id"`);
    await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "email_verificado"`);
    await queryRunner.query(`DROP TABLE "email_verification_tokens"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_6bc88c0a92818d5eb2e4b51c0c"`);
    await queryRunner.query(`DROP TABLE "login_attempts"`);
    await queryRunner.query(`DROP TABLE "password_reset_tokens"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_4800a3bb1422f53154e48e9450"`);
    await queryRunner.query(`DROP TABLE "refresh_tokens"`);
  }
}
