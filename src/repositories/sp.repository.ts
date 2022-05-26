import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Sp, SpRelations} from '../models';

export class SpRepository extends DefaultCrudRepository<
  Sp,
  typeof Sp.prototype.id,
  SpRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Sp, dataSource);
  }
}
