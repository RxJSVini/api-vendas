import { Request, Response } from 'express';
import { ListUserService } from '../services/ListUserService';
import { CreateUserService } from '../services/CreateUserService';


export default class ProfileController {
	public async index(req:Request, res:Response):Promise<Response>{
		const listUser = new ListUserService();

		const users =  await listUser.execute();

		return res.status(200).json(users);
	}

	public async create(req:Request, res:Response): Promise<Response>{

		const createUser = new CreateUserService();
		const { name, email, password } = req.body;


		const user = await createUser.execute({
			name,
			email,
			password
		});

		return res.status(201).json(user);

	}
}