import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { UserTokenRepository } from '../typeorm/repositories/UserTokenRepository';

interface IRequest {
  email: string;

}

export class SendForgotPasswordEmailService {
	public async execute({  email  }: IRequest): Promise<void> {
		const usersRepository = getCustomRepository(UserRepository);
		const userTokensRepository = getCustomRepository(UserTokenRepository);

		const user = await usersRepository.findByEmail(email);

		if (!user) {
			throw new AppError('User does not exists');
		}

		
		const token = await userTokensRepository.generate(user.id);


		console.log(token);
	}
}
