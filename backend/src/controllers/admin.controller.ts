import  type{ Request, Response } from 'express';
import { adminService } from '../services/admin.service.js';

export const getAllUsers = async (req: Request, res: Response) => {
   const users = await adminService.getAllUsers();
    res.status(200).json(users);
};

export const getUserById = async (req: Request<{ id: string }>, res: Response) => {
    const id = req.params.id;
    const user = await adminService.getUserById(id);
    res.status(200).json(user);
};