import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty,IsEmail } from 'class-validator';
export class UserAuthDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, uniqueItems: true })
  email: string;
}

export class UserAuthResultDto {
  username: string;
  email: string;
  token: string;
}
