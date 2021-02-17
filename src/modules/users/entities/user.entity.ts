import { Entity } from 'typeorm';
import { CoreModel } from '../../../core/entities/core.model';

@Entity()
export class UserEntity extends CoreModel {}
