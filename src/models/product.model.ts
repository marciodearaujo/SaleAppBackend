import {Entity, model, property, hasMany} from '@loopback/repository';
import {Item} from './item.model';

@model({
  settings: {
    mysql: {table: 'product'}, // custom names
  },
})
export class Product extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'number',
    default: 0,
  })
  amount?: number;

  @property({
    type: 'string',
    default: 'both',
  })
  sex?: string;

  @hasMany(() => Item)
  items: Item[];

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
