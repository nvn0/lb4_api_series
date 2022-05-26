import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Sc, ScRelations} from '../models';

export class ScRepository extends DefaultCrudRepository<
  Sc,
  typeof Sc.prototype.id,
  ScRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Sc, dataSource);
  }
}
