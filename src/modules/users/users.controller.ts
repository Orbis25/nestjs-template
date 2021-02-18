import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { CoreController } from 'src/core/controller/Core.controller';

@Controller('users')
export class UsersController extends CoreController<
  UserEntity,
  CreateUserDto,
  UsersService
> {
  constructor(private readonly userService: UsersService) {
    super(userService);
  }
}
