import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { hash } from 'bcryptjs';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
	public async execute({ name, email, password }: IRequest): Promise<User> {
		const usersRepository = getCustomRepository(UserRepository);
		const emailExists = await usersRepository.findByEmail(email);

		if (emailExists) {
			throw new AppError('Email address alredy used');
		}

		const hasPassword = await hash(password, 10);

		const user = usersRepository.create({
			name,
			email,
			password:hasPassword,
		});

		await usersRepository.save(user);

		return user;
	}
}
