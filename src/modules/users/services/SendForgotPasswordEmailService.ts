import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { UserTokenRepository } from '../typeorm/repositories/UserTokenRepository';
import { EtherealMail } from '@config/mail/EtherealMail';
import path from 'path';

interface IRequest {
  email: string;
}

export class SendForgotPasswordEmailService {
	public async execute({ email }: IRequest): Promise<void> {
		const usersRepository = getCustomRepository(UserRepository);
		const userTokensRepository = getCustomRepository(UserTokenRepository);

		const user = await usersRepository.findByEmail(email);

		if (!user) {
			throw new AppError('User does not exists');
		}

		const { token } = await userTokensRepository.generate(user.id);

		const forgotPasswordTemplate = path.resolve(
			__dirname,
			'..',
			'views',
			'forgot_password.hbs',
		);

		await EtherealMail.sendMail({
			to: {
				name: user.name,
				email: user.email,
			},

			subject: '[ API Vendas ] Reperação de Senha',

			templateData: {
				file: forgotPasswordTemplate,
				variables: {
					name: user.name,
					link: `http://localhost:3000/reset_password?token${token}`,
				},
			},
		});
	}
}
