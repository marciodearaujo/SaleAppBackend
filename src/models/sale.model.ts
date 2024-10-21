import {Entity, model, property, hasMany} from '@loopback/repository';
import {Item} from './item.model';

@model({
  settings: {
    mysql: {table: 'sale'}, // custom names
  },
})
export class Sale extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
    mysql:{
      columnName:'sale_date'
    }
  })
  saleDate: string;

  @property({
    type: 'number',
    required: true,
    mysql:{
      columnName:"client_id"
    }
  })
  clientId: number;

  @hasMany(() => Item)
  items: Item[];

  constructor(data?: Partial<Sale>) {
    super(data);
  }
}

export interface SaleRelations {
  // describe navigational properties here
}

export type SaleWithRelations = Sale & SaleRelations;
