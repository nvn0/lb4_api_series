import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Serie} from '../models';
import {SerieRepository} from '../repositories';

export class SerieController {
  constructor(
    @repository(SerieRepository)
    public serieRepository : SerieRepository,
  ) {}

  @post('/series')
  @response(200, {
    description: 'Serie model instance',
    content: {'application/json': {schema: getModelSchemaRef(Serie)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Serie, {
            title: 'NewSerie',
            exclude: ['id'],
          }),
        },
      },
    })
    serie: Omit<Serie, 'id'>,
  ): Promise<Serie> {
    return this.serieRepository.create(serie);
  }

  @get('/series/count')
  @response(200, {
    description: 'Serie model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Serie) where?: Where<Serie>,
  ): Promise<Count> {
    return this.serieRepository.count(where);
  }

  @get('/series')
  @response(200, {
    description: 'Array of Serie model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Serie, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Serie) filter?: Filter<Serie>,
  ): Promise<Serie[]> {
    return this.serieRepository.find(filter);
  }

  @patch('/series')
  @response(200, {
    description: 'Serie PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Serie, {partial: true}),
        },
      },
    })
    serie: Serie,
    @param.where(Serie) where?: Where<Serie>,
  ): Promise<Count> {
    return this.serieRepository.updateAll(serie, where);
  }

  @get('/series/{id}')
  @response(200, {
    description: 'Serie model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Serie, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Serie, {exclude: 'where'}) filter?: FilterExcludingWhere<Serie>
  ): Promise<Serie> {
    return this.serieRepository.findById(id, filter);
  }

  @patch('/series/{id}')
  @response(204, {
    description: 'Serie PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Serie, {partial: true}),
        },
      },
    })
    serie: Serie,
  ): Promise<void> {
    await this.serieRepository.updateById(id, serie);
  }

  @put('/series/{id}')
  @response(204, {
    description: 'Serie PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() serie: Serie,
  ): Promise<void> {
    await this.serieRepository.replaceById(id, serie);
  }

  @del('/series/{id}')
  @response(204, {
    description: 'Serie DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.serieRepository.deleteById(id);
  }
}
