import AppError from '@shared/erros/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
}
//buscar por ID.
class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository.findOne(id);
    if (!product) {
      throw new AppError('Product not found');
    }

    await productsRepository.remove(product);
  }
}
export default DeleteProductService;
