import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { UserRepository } from 'src/modules/users/repositories/user.respository';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //define the token extraction
      secretOrKey: process.env.JWT_SECRET_KEY,
      ignoreExpiration: false,
    });
  }

  async validate(payload: { email: string }): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      email: payload.email,
    });

    if (!user) {
      throw new UnauthorizedException('not authorized user');
    }

    return user;
  }
}