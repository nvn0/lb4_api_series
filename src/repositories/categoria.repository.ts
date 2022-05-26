import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Categoria, CategoriaRelations, Serie, Sc} from '../models';
import {ScRepository} from './sc.repository';
import {SerieRepository} from './serie.repository';

export class CategoriaRepository extends DefaultCrudRepository<
  Categoria,
  typeof Categoria.prototype.id,
  CategoriaRelations
> {

  public readonly series: HasManyThroughRepositoryFactory<Serie, typeof Serie.prototype.id,
          Sc,
          typeof Categoria.prototype.id
        >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ScRepository') protected scRepositoryGetter: Getter<ScRepository>, @repository.getter('SerieRepository') protected serieRepositoryGetter: Getter<SerieRepository>,
  ) {
    super(Categoria, dataSource);
    this.series = this.createHasManyThroughRepositoryFactoryFor('series', serieRepositoryGetter, scRepositoryGetter,);
    this.registerInclusionResolver('series', this.series.inclusionResolver);
  }
}
