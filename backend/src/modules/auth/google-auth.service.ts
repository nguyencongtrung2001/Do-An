import { OAuth2Client } from 'google-auth-library';
import { ApiError } from '../../utils/ApiError.js';
import { generateToken } from '../../utils/jwt.js';
import { userRepository } from '../../repositories/nguoidung.repository.js';
import dotenv from 'dotenv';
dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export class GoogleAuthService {
  async DangNhapBangGoogle(idToken: string) {
    if (!idToken) {
      throw new ApiError(400, "Cần phải có token");
    }

    
    let payload;
    try {
      const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      payload = ticket.getPayload();
    } catch (error) {
      console.error("Lỗi xác thực Google token:", error);
      throw new ApiError(401, "Không hợp lệ Google token");
    }

    if (!payload || !payload.email) {
      throw new ApiError(400, "Không thể lấy email từ Google token");
    }

    const email = payload.email;
    const name = payload.name || "Google User";
    const picture = payload.picture ?? undefined;
    const googleId = payload.sub;

    
    let user = await userRepository.TimTheoEmail(email);

    if (!user) {
      
      const newId = await userRepository.TaoMaNguoiDungTiepTheo();
      user = await userRepository.TaoMoi({
        ma_nguoi_dung: newId,
        email: email,
        ho_ten: name,
        ma_google: googleId,
        anh_dai_dien: picture ?? undefined,
        trang_thai: true,
      });
    } else {
      
      if (user.ma_google !== googleId || user.anh_dai_dien !== picture) {
        user = await userRepository.CapNhat(user.ma_nguoi_dung, {
          ma_google: googleId,
          anh_dai_dien: picture || user.anh_dai_dien,
        });
      }
    }

    if (!user) {
      throw new ApiError(500, "Failed to process user data");
    }

    
    const token = generateToken({ id: user.ma_nguoi_dung, role: user.vai_tro });

    return { user, token };
  }
}

export const googleAuthService = new GoogleAuthService();
