import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDocumentsTables1765216502389 implements MigrationInterface {
    name = 'AddDocumentsTables1765216502389'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "term_of_responsibility" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "content" text NOT NULL, "version" character varying NOT NULL, "validity_start_date" TIMESTAMP NOT NULL, "validity_end_date" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9eb95e108f110a69fdd4bdb822f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "term_signature" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "signature_date" TIMESTAMP NOT NULL, "expiration_date" TIMESTAMP NOT NULL, "document_url" character varying, "photo_url" character varying, "identity_document_url" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, "term_id" uuid, CONSTRAINT "PK_3b1f2d67d6872613ae723dbfe29" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "term_signature" ADD CONSTRAINT "FK_de98785fe7bb1535f9efa0ce559" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "term_signature" ADD CONSTRAINT "FK_0a5e42c8f784a130279d8493dc8" FOREIGN KEY ("term_id") REFERENCES "term_of_responsibility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "term_signature" DROP CONSTRAINT "FK_0a5e42c8f784a130279d8493dc8"`);
        await queryRunner.query(`ALTER TABLE "term_signature" DROP CONSTRAINT "FK_de98785fe7bb1535f9efa0ce559"`);
        await queryRunner.query(`DROP TABLE "term_signature"`);
        await queryRunner.query(`DROP TABLE "term_of_responsibility"`);
    }

}
