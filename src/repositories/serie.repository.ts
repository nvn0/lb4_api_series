import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Serie, SerieRelations, Plataforma, Sp, Categoria, Sc} from '../models';
import {SpRepository} from './sp.repository';
import {PlataformaRepository} from './plataforma.repository';
import {ScRepository} from './sc.repository';
import {CategoriaRepository} from './categoria.repository';

export class SerieRepository extends DefaultCrudRepository<
  Serie,
  typeof Serie.prototype.id,
  SerieRelations
> {

  public readonly Plataforma: HasManyThroughRepositoryFactory<Plataforma, typeof Plataforma.prototype.id,
          Sp,
          typeof Serie.prototype.id
        >;

  public readonly Categoria: HasManyThroughRepositoryFactory<Categoria, typeof Categoria.prototype.id,
          Sc,
          typeof Serie.prototype.id
        >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('SpRepository') protected spRepositoryGetter: Getter<SpRepository>, @repository.getter('PlataformaRepository') protected plataformaRepositoryGetter: Getter<PlataformaRepository>, @repository.getter('ScRepository') protected scRepositoryGetter: Getter<ScRepository>, @repository.getter('CategoriaRepository') protected categoriaRepositoryGetter: Getter<CategoriaRepository>,
  ) {
    super(Serie, dataSource);
    this.Categoria = this.createHasManyThroughRepositoryFactoryFor('Categoria', categoriaRepositoryGetter, scRepositoryGetter,);
    this.registerInclusionResolver('Categoria', this.Categoria.inclusionResolver);
    this.Plataforma = this.createHasManyThroughRepositoryFactoryFor('Plataforma', plataformaRepositoryGetter, spRepositoryGetter,);
    this.registerInclusionResolver('Plataforma', this.Plataforma.inclusionResolver);
  }
}
