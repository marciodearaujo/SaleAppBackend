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
  Sale,
  Item,
} from '../models';
import {SaleRepository} from '../repositories';

export class SaleItemController {
  constructor(
    @repository(SaleRepository) protected saleRepository: SaleRepository,
  ) { }

  @get('/sales/{id}/items', {
    responses: {
      '200': {
        description: 'Array of Sale has many Item',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Item)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Item>,
  ): Promise<Item[]> {
    return this.saleRepository.items(id).find(filter);
  }

  @post('/sales/{id}/items', {
    responses: {
      '200': {
        description: 'Sale model instance',
        content: {'application/json': {schema: getModelSchemaRef(Item)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Sale.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Item, {
            title: 'NewItemInSale',
            exclude: ['id'],
            optional: ['saleId']
          }),
        },
      },
    }) item: Omit<Item, 'id'>,
  ): Promise<Item> {
    return this.saleRepository.items(id).create(item);
  }

  @patch('/sales/{id}/items', {
    responses: {
      '200': {
        description: 'Sale.Item PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Item, {partial: true}),
        },
      },
    })
    item: Partial<Item>,
    @param.query.object('where', getWhereSchemaFor(Item)) where?: Where<Item>,
  ): Promise<Count> {
    return this.saleRepository.items(id).patch(item, where);
  }

  @del('/sales/{id}/items', {
    responses: {
      '200': {
        description: 'Sale.Item DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Item)) where?: Where<Item>,
  ): Promise<Count> {
    return this.saleRepository.items(id).delete(where);
  }
}
