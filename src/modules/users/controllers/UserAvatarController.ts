import { Request, Response } from 'express';
import { UpdateUserAvatarService } from '../services/UpdateUserAvatarService';

export class UserAvatarController {
	public async update(req: Request, res: Response) {
		const updateAvatar = new UpdateUserAvatarService();

		const user = await updateAvatar.execute({
			user_id:req.user.id,
			avatarFilename:`${req.file?.filename}`
		});
		
		return res.json(user);
	
	}
}
