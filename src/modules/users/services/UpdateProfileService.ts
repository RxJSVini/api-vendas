import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { th } from 'date-fns/locale';

interface IRequest {
	user_id:string;
	name:string;
	email:string;
	password:string;
	old_password:string;
}

export class UpdateProfileService {
	public async execute({ 
		user_id,
		name,
		email,
		password,
		old_password
	
	}:IRequest): Promise<User>{
		const usersRepository = getCustomRepository(UserRepository);

		const user = await usersRepository.findById(user_id);

		if(!user){
			throw new Error('User not found.');
		}

		const userUpdateEmail = await usersRepository.findByEmail(email);

		if(userUpdateEmail && userUpdateEmail.id !== user.id){
			throw new Error('There is alredy one user with this e-mail.');
		}
		if(password && !old_password){
			throw new Error('Old password is required.');
		}

		return user;
	}
}

