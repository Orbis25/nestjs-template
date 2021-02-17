import { EntityRepository } from 'typeorm';
import CoreRepository from '../../../core/repositories/Core.repository';
import { UserEntity } from '../entities/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends CoreRepository<UserEntity> {}
