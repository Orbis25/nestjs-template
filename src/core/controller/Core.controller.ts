import {
  Body,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CorePagination } from '../entities/core-pagination.model';
import CoreService from '../services/Core.service';
import { CoreModel } from '../entities/core.model';

export abstract class CoreController<
  TEntity extends CoreModel,
  TDto extends any,
  TService extends CoreService<TEntity>
> {
  constructor(private readonly service: TService) {}

  @Get()
  async getAll(
    @Query('qyt', new DefaultValuePipe(10), ParseIntPipe) qyt?: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('isAll', new DefaultValuePipe(false), ParseBoolPipe) isAll?: boolean,
  ): Promise<CorePagination<TEntity>> {
    return await this.service.getAll(qyt, page, isAll);
  }

  @Post()
  async create(@Body() user: TDto): Promise<TEntity> {
    return await this.service.create(user as TEntity);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() user: TDto): Promise<TEntity> {
    return await this.service.update(id, user as TEntity);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.service.remove(id);
  }
}
