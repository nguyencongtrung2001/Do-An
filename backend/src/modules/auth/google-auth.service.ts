import { OAuth2Client } from 'google-auth-library';
import { ApiError } from '../../utils/ApiError';
import { generateToken } from '../../utils/jwt';
import { userRepository } from '../../repositories/user.repository';
import dotenv from 'dotenv';
dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export class GoogleAuthService {
  async loginWithGoogle(idToken: string) {
    if (!idToken) {
      throw new ApiError(400, "Token is required");
    }

    // Verify Google ID Token
    let payload;
    try {
      const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      payload = ticket.getPayload();
    } catch (error) {
      console.error("Google verify token error:", error);
      throw new ApiError(401, "Invalid Google token");
    }

    if (!payload || !payload.email) {
      throw new ApiError(400, "Cannot get email from Google token");
    }

    const email = payload.email;
    const name = payload.name || "Google User";
    const picture = payload.picture || null;
    const googleId = payload.sub;

    // Find user by email
    let user = await userRepository.findByEmailOrPhone(email, undefined);

    if (!user) {
      // Create new user if not exists
      const newId = await userRepository.generateNextUserId();
      user = await userRepository.create({
        ma_nguoi_dung: newId,
        email: email,
        ho_ten: name,
        ma_google: googleId,
        anh_dai_dien: picture,
        trang_thai: true,
      });
    } else {
      // Update ma_google and anh_dai_dien if they are missing/different
      if (user.ma_google !== googleId || user.anh_dai_dien !== picture) {
        user = await userRepository.update(user.ma_nguoi_dung, {
          ma_google: googleId,
          anh_dai_dien: picture || user.anh_dai_dien,
        });
      }
    }

    // Generate JWT
    const token = generateToken({ id: user.ma_nguoi_dung, role: user.vai_tro });

    return { user, token };
  }
}

export const googleAuthService = new GoogleAuthService();
