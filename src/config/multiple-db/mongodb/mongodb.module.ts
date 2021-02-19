import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from '@hapi/joi';
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath:'.env',
            validationSchema: Joi.object({
                MONGO_DATABASE_HOST: Joi.required(),
                MONGO_DATABASE_PORT: Joi.required().default(3000),
                MONGO_DATABASE_NAME: Joi.required(),
                MONGO_DATABASE_PASSWORD: Joi.required(),
                MONGO_DATABASE_CONNECTION_TIME_OUT: Joi.required(),
            }),
        }),
        TypeOrmModule.forRootAsync({
            useFactory:() => ({
              name:'mongodbDefault' ,
              type: 'mongodb',
              host: process.env.MONGO_DATABASE_HOST,
              port: +process.env.MONGO_DATABASE_PORT,
              username: process.env.MONGO_DATABASE_USERNAME,
              password: process.env.MONGO_DATABASE_PASSWORD,
              database: process.env.MONGO_DATABASE_NAME,
              autoLoadEntities:true,
              synchronize: true,
              useNewUrlParser: true,
              logging:true,
              connectTimeoutMS: +process.env.MONGO_DATABASE_CONNECTION_TIME_OUT,
              migrations:[], // load  entities here {Class with the @Entity() decorator},
              cli:{
                migrationsDir:'src/migrations/mongo'
              },            
            })
        })
    ],
    exports:[ConfigService]
})
export class MongodbModule {}
