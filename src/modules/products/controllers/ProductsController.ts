import { Request, Response } from 'express';
import { ListProductService } from '../services/ListProductService';
import { ShowProductService } from '../services/ShowProductService';
import { Product } from '../typeorm/entities/Product';
import { UpdateProductService } from '../services/UpdateProductService';
import { CreateProductService } from '../services/CreateProductService';
import { DeleteProductService } from '../services/DeleteProductService';

export class ProductsControler {
	public async index(req: Request, res: Response) {
		const listProducts = new ListProductService();

		const products = await listProducts.execute();

		return res.status(200).json(products);
	}

	public async show(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		const showProduct = new ShowProductService();
		const product = await showProduct.execute({ id });

		return res.status(200).json(product);
	}

	public async create(req: Request, res: Response): Promise<Response> {
		const { name, price, quantity } = req.body;
		const createProduct = new CreateProductService();
		const product = await createProduct.execute({
			name,
			price,
			quantity,
		});

		return res.status(201).json(product);
	}

	public async update(req: Request, res: Response): Promise<Response> {
		const { name, price, quantity }: Product = req.body;
		const { id } = req.params;

		const updateProduct = new UpdateProductService();

		const product = await updateProduct.execute({
			id,
			name,
			price,
			quantity,
		});

		return res.status(200).json(product);
	}

	public async delete(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		const deleteProduct = new DeleteProductService();

		await deleteProduct.execute({ id });

		return res.end();
	}
}
