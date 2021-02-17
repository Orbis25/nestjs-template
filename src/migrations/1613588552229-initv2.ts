import {MigrationInterface, QueryRunner} from "typeorm";

export class initv21613588552229 implements MigrationInterface {
    name = 'initv21613588552229'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user_entity"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user_entity" ALTER COLUMN "createdAt" SET DEFAULT '"2021-02-17T19:02:34.772Z"'`);
        await queryRunner.query(`COMMENT ON COLUMN "user_entity"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user_entity" ALTER COLUMN "updatedAt" SET DEFAULT '"2021-02-17T19:02:34.772Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" ALTER COLUMN "updatedAt" SET DEFAULT '2021-02-17 19:01:08.392'`);
        await queryRunner.query(`COMMENT ON COLUMN "user_entity"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user_entity" ALTER COLUMN "createdAt" SET DEFAULT '2021-02-17 19:01:08.392'`);
        await queryRunner.query(`COMMENT ON COLUMN "user_entity"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "email"`);
    }

}
