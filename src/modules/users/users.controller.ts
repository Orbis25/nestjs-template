import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAll(): Promise<UserEntity[]> {
    return await this.userService.getAll();
  }

  @Post()
  async create(@Body() user: CreateUserDto): Promise<UserEntity> {
    return await this.userService.create(user as UserEntity);
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() user: CreateUserDto,
  ): Promise<UserEntity> {
    return await this.userService.update(id, user as UserEntity);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}
