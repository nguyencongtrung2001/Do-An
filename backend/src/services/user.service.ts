import prisma from '../config/prisma.js';
import bcrypt from 'bcryptjs';
import type * as User from '../typescript/user.type.js';
import { ApiError } from '../utils/ApiError.js';
import { generateToken } from '../utils/jwt.js';

export class UserService {
  async createUser(data: User.UserClient) {
    const { ho_ten, email, so_dien_thoai, mat_khau } = data;

    // 1. kiểm tra email hoặc sdt đã tồn tại
    const existingUser = await prisma.nguoidung.findFirst({
      where: {
        OR: [
          { email },
          { so_dien_thoai }
        ]
      }
    });

    if (existingUser) {
      if (existingUser.email === email) {
        throw new ApiError(400, "Email đã tồn tại trong hệ thống");
      }
      if (existingUser.so_dien_thoai === so_dien_thoai) {
        throw new ApiError(400, "Số điện thoại đã tồn tại trong hệ thống");
      }
    }

    // 2. tạo id như U001, U002...
    const lastUser = await prisma.nguoidung.findFirst({
      orderBy: { ma_nguoi_dung: 'desc' }
    });

    let newId = "U001";
    if (lastUser && lastUser.ma_nguoi_dung.startsWith("U")) {
      const lastNumber = parseInt(lastUser.ma_nguoi_dung.replace("U", ""), 10);
      if (!isNaN(lastNumber)) {
        newId = `U${String(lastNumber + 1).padStart(3, '0')}`;
      }
    }

    // 3. mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(mat_khau, salt);

    // 4. lưu vào database
    const user = await prisma.nguoidung.create({
      data: {
        ma_nguoi_dung: newId,
        ho_ten,
        email,
        so_dien_thoai,
        mat_khau: hashedPassword,
        trang_thai: true,
      }
    });

    const token = generateToken({ id: user.ma_nguoi_dung, role: user.vai_tro });
    return { user, token };
  }

  async loginUser(data:User.LoginUserClient){
    const {so_dien_thoai,email,mat_khau} = data;

    const user = await prisma.nguoidung.findFirst({
        where:{
            OR:[
                {
                    so_dien_thoai:so_dien_thoai,
                },
                {
                    email:email
                }
            ]
            
        }
    })

    if(!user){
        throw new ApiError(404,"User not found");
    }
    
    if(!user.mat_khau){
        throw new ApiError(400,"Tài khoản chưa được thiết lập mật khẩu (có thể đăng nhập bằng phương thức khác).");
    }

    const isMatch = await bcrypt.compare(mat_khau,user.mat_khau);
    if(!isMatch){
        throw new ApiError(400,"Invalid password");
    }

    const token = generateToken({ id: user.ma_nguoi_dung, role: user.vai_tro });

    return { user, token };
  }
}

export const userService = new UserService();
