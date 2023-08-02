import { Router } from 'express';
import { ProductsControler } from '@modules/products/controllers/ProductsController';
import { celebrate, Joi, Segments } from 'celebrate';

export const productsRouter = Router();
const productsController = new ProductsControler();

productsRouter.get('/', productsController.index);

productsRouter.get(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().required(),
		},
	}),
	productsController.show,
);

productsRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			price: Joi.number().precision(2).required(),
			quantity: Joi.number().required(),
		},
	}),
	productsController.create,
);

productsRouter.put(
	'/:id',

	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().required(),
		},
		[Segments.BODY]: {
			name: Joi.string().required(),
			price: Joi.number().precision(2).required(),
			quantity: Joi.number().required(),
		},
	}),
	productsController.update,
);
productsRouter.delete('/:id', 
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().required(),
		}
	})
	,productsController.delete);
