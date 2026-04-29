import type { Request, Response } from 'express';
import type * as User from '../typescript/user.type.js';
import { userService } from '../services/user.service.js';



export const postUserClient = async (req: Request<{}, any, User.UserClient>, res: Response) => {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
};
export const loginUserClient = async(req:Request<{},any,User.LoginUserClient>,res:Response) => {
  const user = await userService.loginUser(req.body);
  res.status(200).json(user);
}