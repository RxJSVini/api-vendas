import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { addHours, isAfter } from 'date-fns';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { UserTokenRepository } from '../typeorm/repositories/UserTokenRepository';
import { hash } from 'bcryptjs';

interface IRequest {
  token: string;
  password:string;

}

export class ResetPasswordService  {
	public async execute({  token, password  }: IRequest): Promise<void> {
		const usersRepository = getCustomRepository(UserRepository);
		const userTokensRepository = getCustomRepository(UserTokenRepository);

		const userToken = await userTokensRepository.findByToken(token);

		if (!userToken) {
			throw new AppError('User does not exists');
		}

		const user = await usersRepository.findById(userToken.user_id);
		
		if(!user){
			throw new AppError('User does not exists.');
		}

		const tokenCreatedAt = userToken.created_at;

		const compareDate = addHours(tokenCreatedAt, 2);

		if(isAfter(Date.now(), compareDate)){
			throw new AppError('Token Expirado.');
		}


		user.password = await hash(password, 8);

		await usersRepository.save(user);

	}
}
