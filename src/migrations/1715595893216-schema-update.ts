import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaUpdate1715595893216 implements MigrationInterface {
  name = 'SchemaUpdate1715595893216';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`avatar\` varchar(255) NULL, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`username\` varchar(255) NULL, \`email_address\` varchar(255) NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`password\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_a95e949168be7b7ece1a2382fe\` (\`uuid\`), UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), UNIQUE INDEX \`IDX_a8979f71f59cb66a8b03bde38c\` (\`email_address\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_a8979f71f59cb66a8b03bde38c\` ON \`user\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_a95e949168be7b7ece1a2382fe\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
