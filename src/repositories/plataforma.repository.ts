import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Plataforma, PlataformaRelations, Serie, Sp} from '../models';
import {SpRepository} from './sp.repository';
import {SerieRepository} from './serie.repository';

export class PlataformaRepository extends DefaultCrudRepository<
  Plataforma,
  typeof Plataforma.prototype.id,
  PlataformaRelations
> {

  public readonly series: HasManyThroughRepositoryFactory<Serie, typeof Serie.prototype.id,
          Sp,
          typeof Plataforma.prototype.id
        >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('SpRepository') protected spRepositoryGetter: Getter<SpRepository>, @repository.getter('SerieRepository') protected serieRepositoryGetter: Getter<SerieRepository>,
  ) {
    super(Plataforma, dataSource);
    this.series = this.createHasManyThroughRepositoryFactoryFor('series', serieRepositoryGetter, spRepositoryGetter,);
    this.registerInclusionResolver('series', this.series.inclusionResolver);
  }
}
