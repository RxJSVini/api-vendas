import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

interface IRequest {
  id: string;
}

export class DeleteProductService {
	public async execute({
		id
	}: IRequest): Promise<void> {
		const productsRepository = getCustomRepository(ProductsRepository);

		const product = await productsRepository.findOne(id);

		if (!product) {
			throw new AppError('Product not found.');
		}

		await productsRepository.delete(product);
	}
}
