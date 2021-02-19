import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import * as Joi from '@hapi/joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
// thees are the entities that will be used in Postgres Connections
@Module({
    imports: [
        // in this import, its to validate the required .ENV file 
        ConfigModule.forRoot({
        envFilePath:'.env',
        validationSchema: Joi.object({
            POSTGRES_HOST: Joi.required().default('localhost'),
            POSTGRES_PORT: Joi.required(),
            POSTGRES_PASSWORD: Joi.required(),
            POSTGRES_DATABASE: Joi.required(),
            POSTGRES_USER: Joi.required(),

            }),
        }),
        
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                name:'default',
                type: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: +process.env.POSTGRES_PORT,
                entities: [UserEntity], // entities specifically for postgres
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DATABASE,
                username: process.env.POSTGRES_USER,
                migrations:['dist/migrations/*.js'],
                cli:{
                    migrationsDir:'src/migrations/postgres'
                },
                synchronize: true
            })
        })
    ],
    providers:[ConfigService]
})
export class PostgresModule {}
