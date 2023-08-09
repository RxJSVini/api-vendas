import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { UserTokenRepository } from '../typeorm/repositories/UserTokenRepository';
import { EtherealMail } from '@config/mail/EtherealMail';

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

		
		const { token } = await userTokensRepository.generate(user.id);


		await EtherealMail.sendMail({
			to:{
				name: user.name,
				email: user.email
			},

			subject:'[ API Vendas ] Reperação de Senha',

			templateData:{
				template: 'Olá {{ name }},  Solicitação de redefinição de senha recebida: {{ token }}',
				variables:{
					name: user.name,
					token: token
				}
			
			}
		});

	}
}
