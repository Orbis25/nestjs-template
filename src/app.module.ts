import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import TypeOrmConfig from './config/typeorm.config';
import { MongodbModule } from './config/multiple-db/mongodb/mongodb.module';
import { PostgresModule } from './config/multiple-db/postgres/postgres.module';

@Module({
  imports: [UsersModule,MongodbModule,PostgresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
