import {MigrationInterface, QueryRunner} from "typeorm";

export class UserMigration1613576567032 implements MigrationInterface {
    name = 'UserMigration1613576567032'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT '"2021-02-17T15:42:50.402Z"', "updatedAt" TIMESTAMP NOT NULL DEFAULT '"2021-02-17T15:42:50.402Z"', CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_entity"`);
    }

}
