import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';
import { Product } from '../typeorm/entities/Product';


export class ListProductService {
	public async execute(): Promise<Product[] | [] > {
		const productsRepository = getCustomRepository(ProductsRepository);

		const product = await productsRepository.find();

		return product;
	}
}
