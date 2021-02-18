import { Column, Entity } from 'typeorm';
import { CoreModel } from '../../../core/entities/core.model';
import * as bcrypt from 'bcrypt';

@Entity()
export class UserEntity extends CoreModel {
  @Column({ nullable: false })
  username: string;
  @Column({ unique: true, nullable: false })
  email: string;
  @Column({ nullable: false })
  password: string;
  @Column({ nullable: false })
  passwordHash: string;

  //TODO:Validate the password of user
  async isValidPassword(password: string): Promise<boolean> {
    const result = await bcrypt.hashSync(password, this.passwordHash);
    return result === this.password;
  }
}
