import { DeleteResult, ObjectID, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { CorePagination } from '../entities/core-pagination.model';

export interface IRead<T> {
  getAll(
    qyt?: number,
    page?: number,
    isAll?: boolean,
  ): Promise<CorePagination<T>>;
  getById(id: string | number| Date | ObjectID): Promise<T>;
}

export interface IWrite<T> {
  add(model: T): Promise<T>;
  modify(id: string, model: QueryDeepPartialEntity<T>): Promise<UpdateResult>;
  removeEntity(id: string |number| Date | ObjectID): Promise<DeleteResult>;
}

export default interface ICoreRepository<T> extends IRead<T>, IWrite<T> {}
