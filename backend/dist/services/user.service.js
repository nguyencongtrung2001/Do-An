import bcrypt from 'bcryptjs';
import { ApiError } from '../utils/ApiError.js';
import { generateToken } from '../utils/jwt.js';
import { userRepository } from '../repositories/user.repository.js';
export class UserService {
    async createUser(data) {
        const { ho_ten, email, so_dien_thoai, mat_khau } = data;
        // 1. Check if email or phone already exists
        const existingUser = await userRepository.findByEmailOrPhone(email, so_dien_thoai);
        if (existingUser) {
            if (existingUser.email === email) {
                throw new ApiError(400, "Email đã tồn tại trong hệ thống");
            }
            if (existingUser.so_dien_thoai === so_dien_thoai) {
                throw new ApiError(400, "Số điện thoại đã tồn tại trong hệ thống");
            }
        }
        // 2. Generate next user ID
        const newId = await userRepository.generateNextUserId();
        // 3. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(mat_khau, salt);
        // 4. Save to database via repository
        const user = await userRepository.create({
            ma_nguoi_dung: newId,
            ho_ten,
            email,
            so_dien_thoai,
            mat_khau: hashedPassword,
            trang_thai: true,
        });
        const token = generateToken({ id: user.ma_nguoi_dung, role: user.vai_tro });
        return { user, token };
    }
    async loginUser(data) {
        const { so_dien_thoai, email, mat_khau } = data;
        console.log("Login attempt for email:", email);
        const user = await userRepository.findByEmailOrPhone(email, so_dien_thoai);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        // Check if account was created via Google and has no password
        if (user.ma_google && !user.mat_khau) {
            throw new ApiError(400, "Tài khoản này được đăng ký qua Google. Vui lòng đăng nhập bằng Google");
        }
        if (!user.mat_khau) {
            throw new ApiError(400, "Tài khoản chưa được thiết lập mật khẩu (có thể đăng nhập bằng phương thức khác).");
        }
        const isMatch = await bcrypt.compare(mat_khau, user.mat_khau);
        if (!isMatch) {
            throw new ApiError(400, "Invalid password");
        }
        const token = generateToken({ id: user.ma_nguoi_dung, role: user.vai_tro });
        return { user, token };
    }
}
export const userService = new UserService();
//# sourceMappingURL=user.service.js.map