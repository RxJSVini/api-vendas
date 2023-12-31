import express from 'express';
import { productsRouter } from '@modules/products/routes/products.routes';
import { usersRouter } from '@modules/users/routes/users.routes';
import { sessionsRouter } from '@modules/users/routes/sessions.routes';
import { passwordRouter } from '@modules/users/routes/password.routes';
export const routes = express.Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.get('/ping', (req, res) =>{
	return res.send('ok');
});