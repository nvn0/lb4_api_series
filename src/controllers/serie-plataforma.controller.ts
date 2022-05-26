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
Sp,
Plataforma,
} from '../models';
import {SerieRepository} from '../repositories';

export class SeriePlataformaController {
  constructor(
    @repository(SerieRepository) protected serieRepository: SerieRepository,
  ) { }

  @get('/series/{id}/plataformas', {
    responses: {
      '200': {
        description: 'Array of Serie has many Plataforma through Sp',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Plataforma)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Plataforma>,
  ): Promise<Plataforma[]> {
    return this.serieRepository.Plataforma(id).find(filter);
  }

  @post('/series/{id}/plataformas', {
    responses: {
      '200': {
        description: 'create a Plataforma model instance',
        content: {'application/json': {schema: getModelSchemaRef(Plataforma)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Serie.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plataforma, {
            title: 'NewPlataformaInSerie',
            exclude: ['id'],
          }),
        },
      },
    }) plataforma: Omit<Plataforma, 'id'>,
  ): Promise<Plataforma> {
    return this.serieRepository.Plataforma(id).create(plataforma);
  }

  @patch('/series/{id}/plataformas', {
    responses: {
      '200': {
        description: 'Serie.Plataforma PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plataforma, {partial: true}),
        },
      },
    })
    plataforma: Partial<Plataforma>,
    @param.query.object('where', getWhereSchemaFor(Plataforma)) where?: Where<Plataforma>,
  ): Promise<Count> {
    return this.serieRepository.Plataforma(id).patch(plataforma, where);
  }

  @del('/series/{id}/plataformas', {
    responses: {
      '200': {
        description: 'Serie.Plataforma DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Plataforma)) where?: Where<Plataforma>,
  ): Promise<Count> {
    return this.serieRepository.Plataforma(id).delete(where);
  }
}
