import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './repositories/user.respository';
import { UserEntity } from './entities/user.entity';
import CoreService from 'src/core/services/Core.service';
import { UserAuthDto, UserAuthResultDto } from './dto/user-auth.dto';

@Injectable()
export class UsersService extends CoreService<UserEntity> {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {
    super(userRepository);
  }

  async register(user: UserEntity): Promise<UserAuthResultDto> {
    try {
      user.passwordHash = await bcrypt.genSaltSync();
      user.password = await this.encryptPassword(
        user.password,
        user.passwordHash,
      );
    } catch (error) {
      throw new BadRequestException(HttpStatus.BAD_REQUEST, error);
    }
    ///TODO: EXEPTION WAS CONTROLLED IN THE SERVICE
    const userCreated = await this.create(user);
    return {
      email: userCreated.email,
      username: userCreated.username,
      token: '',
    };
  }

  async login(user: UserAuthDto): Promise<UserAuthResultDto> {
    try {
      const result = await this.userRepository.findOne({ email: user.email });
      if (!result) throw new NotFoundException('Not found');
      if (!(await result.isValidPassword(user.password)))
        throw new BadRequestException('invalid login!');
      return {
        email: result.email,
        username: result.username,
        token: '',
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  private async encryptPassword(
    password: string,
    salt: string,
  ): Promise<string> {
    return await bcrypt.hashSync(password, salt);
  }
}
