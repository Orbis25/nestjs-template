import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { getFormatedDate } from '../../helpers/date.helper';

export class CoreModel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', default: new Date() })
  createdAt = new Date();

  @Column({ type: 'timestamp', default: new Date() })
  updatedAt = new Date();

  createAtStr = getFormatedDate(this.createdAt);
  updateAtStr = getFormatedDate(this.updatedAt);
}
