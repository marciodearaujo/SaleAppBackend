import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Sale, SaleRelations, Item} from '../models';
import {ItemRepository} from './item.repository';

export class SaleRepository extends DefaultCrudRepository<
  Sale,
  typeof Sale.prototype.id,
  SaleRelations
> {

  public readonly items: HasManyRepositoryFactory<Item, typeof Sale.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ItemRepository') protected itemRepositoryGetter: Getter<ItemRepository>,
  ) {
    super(Sale, dataSource);
    this.items = this.createHasManyRepositoryFactoryFor('items', itemRepositoryGetter,);
    this.registerInclusionResolver('items', this.items.inclusionResolver);
  }
}
