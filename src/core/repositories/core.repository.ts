import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import ICoreRepository from './ICore.repository';

export default abstract class CoreRepository<T>
  extends Repository<T>
  implements ICoreRepository<T> {
  async removeEntity(id: string): Promise<DeleteResult> {
    return await this.delete(id);
  }

  async add(model: T): Promise<T> {
    return await this.save(model);
  }

  async modify(
    id: string,
    model: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult> {
    return await this.update(id, model);
  }

  async getAll(): Promise<T[]> {
    return await this.find({});
  }
  async getById(id: string): Promise<T> {
    return await this.findOne(id);
  }
}
