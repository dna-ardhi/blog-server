import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1715649136089 implements MigrationInterface {
    name = 'SchemaUpdate1715649136089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "avatar" character varying, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "username" character varying, "email_address" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a95e949168be7b7ece1a2382fed" UNIQUE ("uuid"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_a8979f71f59cb66a8b03bde38c1" UNIQUE ("email_address"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
