import {
  BadRequestException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import CoreRepository from '../repositories/Core.repository';

export default class CoreService<T> {
  private repository: CoreRepository<T>;
  /**
   *
   */
  constructor(repo: CoreRepository<T>) {
    this.repository = repo;
  }

  async create(dto: T): Promise<T> {
    try {
      return await this.repository.add(dto);
    } catch (error) {
      throw new BadRequestException(HttpStatus.BAD_REQUEST, error);
    }
  }

  async update(id: string, dto: T): Promise<T> {
    try {
      const result = await this.repository.modify(id, dto);
      if (result.affected > 0) return await this.repository.getById(id);
      throw new BadRequestException('error updating the entity');
    } catch (error) {
      throw new BadRequestException(HttpStatus.BAD_REQUEST, error);
    }
  }

  async getAll(): Promise<T[]> {
    try {
      return await this.repository.getAll();
    } catch (error) {
      throw new BadRequestException(HttpStatus.BAD_REQUEST, error);
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      const result = await this.repository.removeEntity(id);
      if (result.affected > 0) return true;
      throw new BadRequestException(`user id:${id} not found`);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
