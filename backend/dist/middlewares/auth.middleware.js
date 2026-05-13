import { verifyToken } from '../utils/jwt.js';
import { ApiError } from '../utils/ApiError.js';
export const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new ApiError(401, 'Unauthorized - No token provided');
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new ApiError(401, 'Unauthorized - Token missing');
        }
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        next(new ApiError(401, 'Unauthorized - Invalid token'));
    }
};
//# sourceMappingURL=auth.middleware.js.map