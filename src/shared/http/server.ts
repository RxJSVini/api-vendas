import 'express-async-errors';
import express, { Request, Response, NextFunction} from 'express';
import { AppError } from '@shared/errors/AppError';
import cors from 'cors';
import '@shared/typeorm';
import 'reflect-metadata';
import { routes } from './routes';
import { errors } from 'celebrate';
import uploads from '@config/uploads';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploads.directory));
app.use('/api', routes);

app.use(errors());

app.use(
	(error: Error, request: Request, response: Response, next: NextFunction) => {
		if (error instanceof AppError) {
			return response.status(error.statusCode).json({
				status: 'error',
				message: error.message,
			});
		}

		console.log(error);

		return response.status(500).json({
			status: 'error',
			message: 'Internal server error',
		});
	},
);

app.listen(3333, () => console.log('Server was started at 3333 port'));
