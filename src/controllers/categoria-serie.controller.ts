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
Categoria,
Sc,
Serie,
} from '../models';
import {CategoriaRepository} from '../repositories';

export class CategoriaSerieController {
  constructor(
    @repository(CategoriaRepository) protected categoriaRepository: CategoriaRepository,
  ) { }

  @get('/categorias/{id}/series', {
    responses: {
      '200': {
        description: 'Array of Categoria has many Serie through Sc',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Serie)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Serie>,
  ): Promise<Serie[]> {
    return this.categoriaRepository.series(id).find(filter);
  }

  @post('/categorias/{id}/series', {
    responses: {
      '200': {
        description: 'create a Serie model instance',
        content: {'application/json': {schema: getModelSchemaRef(Serie)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Categoria.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Serie, {
            title: 'NewSerieInCategoria',
            exclude: ['id'],
          }),
        },
      },
    }) serie: Omit<Serie, 'id'>,
  ): Promise<Serie> {
    return this.categoriaRepository.series(id).create(serie);
  }

  @patch('/categorias/{id}/series', {
    responses: {
      '200': {
        description: 'Categoria.Serie PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Serie, {partial: true}),
        },
      },
    })
    serie: Partial<Serie>,
    @param.query.object('where', getWhereSchemaFor(Serie)) where?: Where<Serie>,
  ): Promise<Count> {
    return this.categoriaRepository.series(id).patch(serie, where);
  }

  @del('/categorias/{id}/series', {
    responses: {
      '200': {
        description: 'Categoria.Serie DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Serie)) where?: Where<Serie>,
  ): Promise<Count> {
    return this.categoriaRepository.series(id).delete(where);
  }
}
