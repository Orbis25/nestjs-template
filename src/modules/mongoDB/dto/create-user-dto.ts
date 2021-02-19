import { ApiProperty } from "@nestjs/swagger";
import { IsString ,IsEmail} from "class-validator";
import { IsNull } from "typeorm";

export class CreateUserDto {
    @ApiProperty({description:'The name of the user', type: 'string', nullable:false})
    @IsString()
    readonly name: string;
    @ApiProperty({description:'The email address of the user', type: 'string', nullable:false})
    @IsEmail()
    readonly email: string;
}
