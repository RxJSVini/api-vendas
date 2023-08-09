import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import jwtConfig from '@config/auth';

type UserProps = {
	name:string;
	email:string;

};
interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: UserProps;
  token: string;
}


export class CreateSessionService {
	public async execute({ email, password }: IRequest): Promise<IResponse |  unknown> {
		try {
			const usersRepository = getCustomRepository(UserRepository);
			const user = await usersRepository.findByEmail(email);

			if (!user) {
				throw new AppError('Incorrect email/password combination.', 401);
			}

			const passwordVerify = await compare(password, user.password);

			if (!passwordVerify) {
				throw new AppError('Incorrect email/password combination.', 401);
			}

			const token = sign({}, jwtConfig.secret, {
				expiresIn: jwtConfig.expiresIn,
			});


			return { user, token } as IResponse;


		} catch (error) {
			return error;
		}
	}
}
