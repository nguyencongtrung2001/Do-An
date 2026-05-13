import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

// Đọc từ môi trường, nếu không có thì mới lấy mặc định là '7d'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'; 

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { 
    expiresIn: JWT_EXPIRES_IN as any // Ép kiểu để tránh lỗi TS nếu cần
  });
};

export const verifyToken = (token: string): object | string => {
  return jwt.verify(token, JWT_SECRET);
};