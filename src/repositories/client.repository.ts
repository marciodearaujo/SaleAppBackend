import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Client, ClientRelations, Sale} from '../models';
import {SaleRepository} from './sale.repository';

export class ClientRepository extends DefaultCrudRepository<
  Client,
  typeof Client.prototype.id,
  ClientRelations
> {

  public readonly sales: HasManyRepositoryFactory<Sale, typeof Client.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SaleRepository') protected saleRepositoryGetter: Getter<SaleRepository>,
  ) {
    super(Client, dataSource);
    this.sales = this.createHasManyRepositoryFactoryFor('sales', saleRepositoryGetter,);
    this.registerInclusionResolver('sales', this.sales.inclusionResolver);
  }
}
