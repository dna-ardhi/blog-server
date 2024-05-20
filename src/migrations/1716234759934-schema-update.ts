import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1716234759934 implements MigrationInterface {
    name = 'SchemaUpdate1716234759934'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."menus_type_enum" AS ENUM('group', 'collapse', 'item')`);
        await queryRunner.query(`CREATE TABLE "menus" ("id" SERIAL NOT NULL, "sequence_number" SERIAL NOT NULL, "title" character varying NOT NULL, "url" character varying NOT NULL, "type" "public"."menus_type_enum" NOT NULL, "icon" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "nsleft" integer NOT NULL DEFAULT '1', "nsright" integer NOT NULL DEFAULT '2', "parentId" integer, CONSTRAINT "PK_3fec3d93327f4538e0cbd4349c4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permissions" ("id" SERIAL NOT NULL, "key" character varying NOT NULL, "description" character varying, "submenu" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "menu_id" integer, CONSTRAINT "UQ_017943867ed5ceef9c03edd9745" UNIQUE ("key"), CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "avatar" character varying, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "username" character varying, "email_address" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "role_id" integer, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_d1a16364b1f276e14e8e4cfc47e" UNIQUE ("email_address"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles_permissions_association" ("role_id" integer NOT NULL, "permission_id" integer NOT NULL, CONSTRAINT "PK_ab10445d60b6d58fef10e0e1537" PRIMARY KEY ("role_id", "permission_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_65125cac05a3f1c9f5a208e254" ON "roles_permissions_association" ("role_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_301de629c5a7d8288a0321c706" ON "roles_permissions_association" ("permission_id") `);
        await queryRunner.query(`ALTER TABLE "menus" ADD CONSTRAINT "FK_8523e13f1ba719e16eb474657ec" FOREIGN KEY ("parentId") REFERENCES "menus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD CONSTRAINT "FK_b9bcaf1da5095642dc631ffbabf" FOREIGN KEY ("menu_id") REFERENCES "menus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles_permissions_association" ADD CONSTRAINT "FK_65125cac05a3f1c9f5a208e254b" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "roles_permissions_association" ADD CONSTRAINT "FK_301de629c5a7d8288a0321c7068" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles_permissions_association" DROP CONSTRAINT "FK_301de629c5a7d8288a0321c7068"`);
        await queryRunner.query(`ALTER TABLE "roles_permissions_association" DROP CONSTRAINT "FK_65125cac05a3f1c9f5a208e254b"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "FK_b9bcaf1da5095642dc631ffbabf"`);
        await queryRunner.query(`ALTER TABLE "menus" DROP CONSTRAINT "FK_8523e13f1ba719e16eb474657ec"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_301de629c5a7d8288a0321c706"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_65125cac05a3f1c9f5a208e254"`);
        await queryRunner.query(`DROP TABLE "roles_permissions_association"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
        await queryRunner.query(`DROP TABLE "menus"`);
        await queryRunner.query(`DROP TYPE "public"."menus_type_enum"`);
    }

}
