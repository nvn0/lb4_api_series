import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Serie,
Sc,
Categoria,
} from '../models';
import {SerieRepository} from '../repositories';

export class SerieCategoriaController {
  constructor(
    @repository(SerieRepository) protected serieRepository: SerieRepository,
  ) { }

  @get('/series/{id}/categorias', {
    responses: {
      '200': {
        description: 'Array of Serie has many Categoria through Sc',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Categoria)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Categoria>,
  ): Promise<Categoria[]> {
    return this.serieRepository.Categoria(id).find(filter);
  }

  @post('/series/{id}/categorias', {
    responses: {
      '200': {
        description: 'create a Categoria model instance',
        content: {'application/json': {schema: getModelSchemaRef(Categoria)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Serie.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categoria, {
            title: 'NewCategoriaInSerie',
            exclude: ['id'],
          }),
        },
      },
    }) categoria: Omit<Categoria, 'id'>,
  ): Promise<Categoria> {
    return this.serieRepository.Categoria(id).create(categoria);
  }

  @patch('/series/{id}/categorias', {
    responses: {
      '200': {
        description: 'Serie.Categoria PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categoria, {partial: true}),
        },
      },
    })
    categoria: Partial<Categoria>,
    @param.query.object('where', getWhereSchemaFor(Categoria)) where?: Where<Categoria>,
  ): Promise<Count> {
    return this.serieRepository.Categoria(id).patch(categoria, where);
  }

  @del('/series/{id}/categorias', {
    responses: {
      '200': {
        description: 'Serie.Categoria DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Categoria)) where?: Where<Categoria>,
  ): Promise<Count> {
    return this.serieRepository.Categoria(id).delete(where);
  }
}
