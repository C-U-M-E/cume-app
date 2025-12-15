import { MigrationInterface, QueryRunner } from "typeorm";

export class RefactoringDocuments1765225089332 implements MigrationInterface {
    name = 'RefactoringDocuments1765225089332'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "term_signature" DROP COLUMN "document_url"`);
        await queryRunner.query(`ALTER TABLE "term_signature" DROP COLUMN "photo_url"`);
        await queryRunner.query(`ALTER TABLE "term_signature" DROP COLUMN "identity_document_url"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "profile_photo_url" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "identity_document_url" character varying`);
        await queryRunner.query(`ALTER TABLE "term_signature" ADD "term_document_url" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "term_signature" DROP COLUMN "term_document_url"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "identity_document_url"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profile_photo_url"`);
        await queryRunner.query(`ALTER TABLE "term_signature" ADD "identity_document_url" character varying`);
        await queryRunner.query(`ALTER TABLE "term_signature" ADD "photo_url" character varying`);
        await queryRunner.query(`ALTER TABLE "term_signature" ADD "document_url" character varying`);
    }

}
