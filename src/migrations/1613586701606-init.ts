import {MigrationInterface, QueryRunner} from "typeorm";

export class init1613586701606 implements MigrationInterface {
    name = 'init1613586701606'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user_entity"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user_entity" ALTER COLUMN "createdAt" SET DEFAULT '"2021-02-17T18:31:44.349Z"'`);
        await queryRunner.query(`COMMENT ON COLUMN "user_entity"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user_entity" ALTER COLUMN "updatedAt" SET DEFAULT '"2021-02-17T18:31:44.350Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" ALTER COLUMN "updatedAt" SET DEFAULT '2021-02-17 15:42:50.402'`);
        await queryRunner.query(`COMMENT ON COLUMN "user_entity"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user_entity" ALTER COLUMN "createdAt" SET DEFAULT '2021-02-17 15:42:50.402'`);
        await queryRunner.query(`COMMENT ON COLUMN "user_entity"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "username"`);
    }

}
