import { Request, Response } from 'express';
import { CreateSessionService } from '../services/CreateSessionService';


export  class SessionsController {
	public async create(req: Request, res: Response): Promise<Response> {
		try {
			const { email, password } = req.body;

			const createSession = new CreateSessionService();
	
			const user = await createSession.execute({
				email,
				password,
			});

			return res.json(user);
		} catch (error) {
			return res.json(error);
		}
	}
}