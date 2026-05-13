import { userService } from '../services/user.service.js';
export const postUserClient = async (req, res) => {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
};
export const loginUserClient = async (req, res) => {
    const user = await userService.loginUser(req.body);
    res.status(200).json(user);
};
//# sourceMappingURL=user.controller.js.map