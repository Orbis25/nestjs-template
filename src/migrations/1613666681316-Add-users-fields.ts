import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUsersFields1613666681316 implements MigrationInterface {
    name = 'AddUsersFields1613666681316'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "passwordHash" character varying NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user_entity"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user_entity" ALTER COLUMN "createdAt" SET DEFAULT '"2021-02-18T16:44:44.755Z"'`);
        await queryRunner.query(`COMMENT ON COLUMN "user_entity"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user_entity" ALTER COLUMN "updatedAt" SET DEFAULT '"2021-02-18T16:44:44.755Z"'`);
        await queryRunner.query(`COMMENT ON COLUMN "user_entity"."email" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5"`);
        await queryRunner.query(`COMMENT ON COLUMN "user_entity"."email" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user_entity" ALTER COLUMN "updatedAt" SET DEFAULT '2021-02-18 14:49:23.438'`);
        await queryRunner.query(`COMMENT ON COLUMN "user_entity"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user_entity" ALTER COLUMN "createdAt" SET DEFAULT '2021-02-18 14:49:23.438'`);
        await queryRunner.query(`COMMENT ON COLUMN "user_entity"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "passwordHash"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "password"`);
    }

}
