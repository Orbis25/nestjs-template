import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.respository';
import { UserEntity } from './entities/user.entity';
import CoreService from 'src/core/services/Core.service';

@Injectable()
export class UsersService extends CoreService<UserEntity> {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {
    super(userRepository);
  }
}
