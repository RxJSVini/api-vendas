import { Router } from 'express';
import UserControler from '../controllers/UserController';
import { celebrate, Joi, Segments } from 'celebrate';
import { isAuthenticated } from '@shared/http/middlewares/isAuthenticated';
import multer from 'multer';
import uploads from '@config/uploads';
import { UserAvatarController } from '../controllers/UserAvatarController';

const usersRouter = Router();
const usersAvatarController = new UserAvatarController();
const usersController = new UserControler();

const upload = multer(uploads);

usersRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		},
	}),
	usersController.create,
);

usersRouter.patch(
	'/avatar',
	isAuthenticated,
	upload.single('avatar'),
	usersAvatarController.update,
);

usersRouter.get('/', isAuthenticated, usersController.index);

export { usersRouter };
