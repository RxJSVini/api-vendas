import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';
import { Product } from '../typeorm/entities/Product';
import AppError from '@shared/errors/AppError';

interface IRequest {
	id:string;
}

export class ShowProductService {
	public async execute({ id }: IRequest): Promise<Product | undefined> {
		const productsRepository = getCustomRepository(ProductsRepository);

		const product = productsRepository.findOne(id);
		if(!product){
			throw new AppError('Product not found.');
		}

		return product;
	}
}
