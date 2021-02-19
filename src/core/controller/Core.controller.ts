import {
  Body,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CorePagination } from '../entities/core-pagination.model';
import CoreService from '../services/Core.service';
import { CoreModel } from '../entities/core.model';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';

export abstract class CoreController<
  TEntity extends CoreModel,
  TDto extends any,
  TService extends CoreService<TEntity>
> {
  constructor(private readonly service: TService) {}

  @ApiResponse({ status: HttpStatus.OK })
  @ApiQuery({ name: 'qyt', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'isAll', required: false })
  @Get()
  async getAll(
    @Query('qyt', new DefaultValuePipe(10), ParseIntPipe) qyt?: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('isAll', new DefaultValuePipe(false), ParseBoolPipe) isAll?: boolean,
  ): Promise<CorePagination<TEntity>> {
    return await this.service.getAll(qyt, page, isAll);
  }

  @ApiResponse({ status: HttpStatus.CREATED })
  @Post()
  async create(@Body(ValidationPipe) user: TDto): Promise<TEntity> {
    return await this.service.create(user as TEntity);
  }

  @ApiResponse({ status: HttpStatus.OK })
  @Put('/:id')
  async update(@Param('id') id: string, @Body(ValidationPipe) user: TDto): Promise<TEntity> {
    return await this.service.update(id, user as TEntity);
  }

  @ApiResponse({ status: HttpStatus.OK })
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.service.remove(id);
  }
}
