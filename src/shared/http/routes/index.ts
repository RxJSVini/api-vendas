import express from 'express';
import { productsRouter } from '@modules/products/routes/products.routes';
import { usersRouter } from '@modules/users/routes/users.routes';
import { sessionsRouter } from '@modules/users/routes/sessions.routes';

export const routes = express.Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

routes.get('/ping', (req, res) =>{
	return res.send('ok');
});