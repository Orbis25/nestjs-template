import { DeleteResult, getManager, Repository, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import ICoreRepository from './ICore.repository';
import { CorePagination } from '../entities/core-pagination.model';

export default abstract class CoreRepository<T>
  extends Repository<T>
  implements ICoreRepository<T> {
  async removeEntity(id: string): Promise<DeleteResult> {
    let index = await this.findOne(id);
    if (index) {
      return await this.delete(index)
    }
   
  }

  async add(model: T): Promise<T> {
    return await this.save(model);
  }
  /**
   * Feature : update the entity with the given model and update (id)
   * @param id 
   * @param model 
   * @returns {any}
   */

  async modify(
    id: string,
    model: QueryDeepPartialEntity<T>,
  ): Promise<any> {
    let index = await this.findOne(id);
    if (index){
      Object.assign(index, model);
      await getManager().transaction(async transactionalEntityManager =>{
        await transactionalEntityManager.save(index);
      })
      return index;
    }
    //return await this.update(id, model);
  }

  async getAll(qyt = 10, page = 1, isAll = false): Promise<CorePagination<T>> {
    const total = await this.count();
    const pages = Math.ceil(total / qyt);

    let results = [];

    if (!isAll) {
      results = await this.find({
        skip: (page - 1) * qyt,
        take: qyt,
      });
    } else {
      results = await this.find({});
    }

    return { qyt, page, pages, total, isAll, results };
  }
  async getById(id: string): Promise<T> {
    return await this.findOne(id);
  }
}
