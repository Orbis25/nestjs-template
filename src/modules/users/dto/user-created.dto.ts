import { ApiProperty } from "@nestjs/swagger";
import { IsString,IsNotEmpty,IsEmail } from "class-validator";

export class CreateUserDto {
  @ApiProperty({required:true})
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({required:true})
  email: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({required:true})
  password:string;
}
