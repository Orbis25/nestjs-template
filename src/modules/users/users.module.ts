import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepository } from './repositories/user.respository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository],'default')],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
