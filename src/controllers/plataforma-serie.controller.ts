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
Plataforma,
Sp,
Serie,
} from '../models';
import {PlataformaRepository} from '../repositories';

export class PlataformaSerieController {
  constructor(
    @repository(PlataformaRepository) protected plataformaRepository: PlataformaRepository,
  ) { }

  @get('/plataformas/{id}/series', {
    responses: {
      '200': {
        description: 'Array of Plataforma has many Serie through Sp',
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
    return this.plataformaRepository.series(id).find(filter);
  }

  @post('/plataformas/{id}/series', {
    responses: {
      '200': {
        description: 'create a Serie model instance',
        content: {'application/json': {schema: getModelSchemaRef(Serie)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Plataforma.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Serie, {
            title: 'NewSerieInPlataforma',
            exclude: ['id'],
          }),
        },
      },
    }) serie: Omit<Serie, 'id'>,
  ): Promise<Serie> {
    return this.plataformaRepository.series(id).create(serie);
  }

  @patch('/plataformas/{id}/series', {
    responses: {
      '200': {
        description: 'Plataforma.Serie PATCH success count',
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
    return this.plataformaRepository.series(id).patch(serie, where);
  }

  @del('/plataformas/{id}/series', {
    responses: {
      '200': {
        description: 'Plataforma.Serie DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Serie)) where?: Where<Serie>,
  ): Promise<Count> {
    return this.plataformaRepository.series(id).delete(where);
  }
}
