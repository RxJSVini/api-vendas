import nodemailer from 'nodemailer';
import { HandlebarsMailTemplate } from './HandleBarsMailTemplate';

interface IMailContract {
  name: string;
  email: string;
}

//https://ethereal.email/

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailtemplate {
  template: string;
  variables: ITemplateVariable;
}

interface ISendMail {
  to: IMailContract;
  from?: IMailContract;
  subject: string;
  templateData: IParseMailtemplate;
}

export class EtherealMail {
	static async sendMail({
		to,
		from,
		subject,
		templateData,
	}: ISendMail): Promise<void> {
		const mailTemplate = new HandlebarsMailTemplate();

		const account = await nodemailer.createTestAccount();

		const transporter = nodemailer.createTransport({
			host: account.smtp.host,
			port: account.smtp.port,
			secure: account.smtp.secure,
			auth: {
				user: account.user,
				pass: account.pass,
			},
		});

		const message = await transporter.sendMail({
			from: {
				name: from?.name || 'Equipe API Vendas',
				address: from?.email || 'equipe@apivendas.com.br',
			},
			to: {
				name: to.name,
				address: to.email,
			},
			subject: subject || 'Recuperação de senha',
			html: await mailTemplate.parse(templateData),
		});

		console.log('Message send: %s', message.messageId);
		console.log('Preview URL %S', nodemailer.getTestMessageUrl(message));
	}
}
