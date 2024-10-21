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
  Product,
  Item,
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductItemController {
  constructor(
    @repository(ProductRepository) protected productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/items', {
    responses: {
      '200': {
        description: 'Array of Product has many Item',
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
    return this.productRepository.items(id).find(filter);
  }

  @post('/products/{id}/items', {
    responses: {
      '200': {
        description: 'Product model instance',
        content: {'application/json': {schema: getModelSchemaRef(Item)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Product.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Item, {
            title: 'NewItemInProduct',
            exclude: ['id'],
            optional: ['productId']
          }),
        },
      },
    }) item: Omit<Item, 'id'>,
  ): Promise<Item> {
    return this.productRepository.items(id).create(item);
  }

  @patch('/products/{id}/items', {
    responses: {
      '200': {
        description: 'Product.Item PATCH success count',
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
    return this.productRepository.items(id).patch(item, where);
  }

  @del('/products/{id}/items', {
    responses: {
      '200': {
        description: 'Product.Item DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Item)) where?: Where<Item>,
  ): Promise<Count> {
    return this.productRepository.items(id).delete(where);
  }
}
