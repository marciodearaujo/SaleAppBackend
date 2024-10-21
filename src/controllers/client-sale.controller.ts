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
  Client,
  Sale,
} from '../models';
import {ClientRepository} from '../repositories';

export class ClientSaleController {
  constructor(
    @repository(ClientRepository) protected clientRepository: ClientRepository,
  ) { }

  @get('/clients/{id}/sales', {
    responses: {
      '200': {
        description: 'Array of Client has many Sale',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sale)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Sale>,
  ): Promise<Sale[]> {
    return this.clientRepository.sales(id).find(filter);
  }

  @post('/clients/{id}/sales', {
    responses: {
      '200': {
        description: 'Client model instance',
        content: {'application/json': {schema: getModelSchemaRef(Sale)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Client.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sale, {
            title: 'NewSaleInClient',
            exclude: ['id'],
            optional: ['clientId']
          }),
        },
      },
    }) sale: Omit<Sale, 'id'>,
  ): Promise<Sale> {
    return this.clientRepository.sales(id).create(sale);
  }

  @patch('/clients/{id}/sales', {
    responses: {
      '200': {
        description: 'Client.Sale PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sale, {partial: true}),
        },
      },
    })
    sale: Partial<Sale>,
    @param.query.object('where', getWhereSchemaFor(Sale)) where?: Where<Sale>,
  ): Promise<Count> {
    return this.clientRepository.sales(id).patch(sale, where);
  }

  @del('/clients/{id}/sales', {
    responses: {
      '200': {
        description: 'Client.Sale DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Sale)) where?: Where<Sale>,
  ): Promise<Count> {
    return this.clientRepository.sales(id).delete(where);
  }
}
