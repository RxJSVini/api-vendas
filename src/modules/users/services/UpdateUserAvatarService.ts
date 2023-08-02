import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import uploadConfig from '@config/uploads';
import path from 'path';
import fs from 'fs';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

export class UpdateUserAvatarService {
	public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
		const usersRepository = getCustomRepository(UserRepository);

		const user = await usersRepository.findById(user_id);

		if (!user) {
			throw new AppError('User not found');
		}

		if (user.avatar) {
			const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
			const userAvatarFileExists =  await fs.promises.stat(userAvatarFilePath);

			if(userAvatarFileExists){
				await fs.promises.unlink(`${userAvatarFileExists}`);
			}
		}

		user.avatar = avatarFilename;
		
		return user;

	}
}
