import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1764978149211 implements MigrationInterface {
    name = 'CreateUserTable1764978149211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_user_type_enum" AS ENUM('standard', 'admin')`);
        await queryRunner.query(`CREATE TYPE "public"."users_registration_status_enum" AS ENUM('pending', 'active', 'blocked')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "birth_date" date NOT NULL, "rg" character varying(20), "cpf" character varying(14) NOT NULL, "user_type" "public"."users_user_type_enum" NOT NULL DEFAULT 'standard', "registration_status" "public"."users_registration_status_enum" NOT NULL DEFAULT 'pending', "associate_status" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_registration_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_user_type_enum"`);
    }

}
