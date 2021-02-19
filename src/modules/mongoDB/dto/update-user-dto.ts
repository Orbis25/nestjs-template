import { PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "src/modules/users/dto/create-user.dto";
/**
 * This is the mongoDB user Update User Dto
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {}
