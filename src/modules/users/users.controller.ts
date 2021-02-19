import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user-created.dto';
import { UserEntity } from './entities/user.entity';
import { CoreController } from 'src/core/controller/Core.controller';
import { UserAuthResultDto, UserAuthDto } from './dto/user-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('UserController')
export class UsersController extends CoreController<
  UserEntity,
  CreateUserDto,
  UsersService
> {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtservice: JwtService,
  ) {
    super(userService);
  }

  @ApiBody({ type: CreateUserDto })
  @Post('/register')
  async register(
    @Body(ValidationPipe) dto: CreateUserDto,
  ): Promise<UserAuthResultDto> {
    return await this.userService.register(dto as UserEntity);
  }

  @ApiBody({ type: UserAuthDto })
  @Post('/login')
  async login(
    @Body(ValidationPipe) dto: UserAuthDto,
  ): Promise<UserAuthResultDto> {
    const payload = await this.userService.login(dto);
    return { ...payload, token: this.jwtservice.sign(payload) };
  }

  @UseGuards(AuthGuard()) //protected route
  @Get('/test')
  getTest() {
    return { ok: true };
  }
}
