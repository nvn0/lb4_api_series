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
import {Plataforma} from '../models';
import {PlataformaRepository} from '../repositories';

export class PlataformaController {
  constructor(
    @repository(PlataformaRepository)
    public plataformaRepository : PlataformaRepository,
  ) {}

  @post('/plataformas')
  @response(200, {
    description: 'Plataforma model instance',
    content: {'application/json': {schema: getModelSchemaRef(Plataforma)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plataforma, {
            title: 'NewPlataforma',
            exclude: ['id'],
          }),
        },
      },
    })
    plataforma: Omit<Plataforma, 'id'>,
  ): Promise<Plataforma> {
    return this.plataformaRepository.create(plataforma);
  }

  @get('/plataformas/count')
  @response(200, {
    description: 'Plataforma model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Plataforma) where?: Where<Plataforma>,
  ): Promise<Count> {
    return this.plataformaRepository.count(where);
  }

  @get('/plataformas')
  @response(200, {
    description: 'Array of Plataforma model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Plataforma, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Plataforma) filter?: Filter<Plataforma>,
  ): Promise<Plataforma[]> {
    return this.plataformaRepository.find(filter);
  }

  @patch('/plataformas')
  @response(200, {
    description: 'Plataforma PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plataforma, {partial: true}),
        },
      },
    })
    plataforma: Plataforma,
    @param.where(Plataforma) where?: Where<Plataforma>,
  ): Promise<Count> {
    return this.plataformaRepository.updateAll(plataforma, where);
  }

  @get('/plataformas/{id}')
  @response(200, {
    description: 'Plataforma model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Plataforma, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Plataforma, {exclude: 'where'}) filter?: FilterExcludingWhere<Plataforma>
  ): Promise<Plataforma> {
    return this.plataformaRepository.findById(id, filter);
  }

  @patch('/plataformas/{id}')
  @response(204, {
    description: 'Plataforma PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plataforma, {partial: true}),
        },
      },
    })
    plataforma: Plataforma,
  ): Promise<void> {
    await this.plataformaRepository.updateById(id, plataforma);
  }

  @put('/plataformas/{id}')
  @response(204, {
    description: 'Plataforma PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() plataforma: Plataforma,
  ): Promise<void> {
    await this.plataformaRepository.replaceById(id, plataforma);
  }

  @del('/plataformas/{id}')
  @response(204, {
    description: 'Plataforma DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.plataformaRepository.deleteById(id);
  }
}
