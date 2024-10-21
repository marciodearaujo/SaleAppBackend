import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Product, ProductRelations, Item} from '../models';
import {ItemRepository} from './item.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id,
  ProductRelations
> {

  public readonly items: HasManyRepositoryFactory<Item, typeof Product.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ItemRepository') protected itemRepositoryGetter: Getter<ItemRepository>,
  ) {
    super(Product, dataSource);
    this.items = this.createHasManyRepositoryFactoryFor('items', itemRepositoryGetter,);
    this.registerInclusionResolver('items', this.items.inclusionResolver);
  }
}
