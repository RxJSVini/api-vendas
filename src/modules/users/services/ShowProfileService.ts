import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UserRepository';


interface IRequest {
	user_id:string;
}

export class ShowProfileService {
	public async execute({ user_id }:IRequest): Promise<User>{
		const usersRepository = getCustomRepository(UserRepository);

		const user = await usersRepository.findById(user_id);

		if(!user){
			throw new Error('User not found.');
		}


		return user;
	}
}

