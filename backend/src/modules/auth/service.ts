import { JwtInstance } from "../../lib/jwt";
import ApiError from "../../shared/apiError";
import { BcryptInstance } from "../../lib/bcrypt";
import { UserService } from "../user/service";
import { IRegister } from "./interface";
import { MailService } from "../mail/mail.service";

class Service {
  async auth(id: string) {
    const user = await UserService.findUserById(id);
    return user;
  }
  async login(
    email: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const isExist = await UserService.findUserByEmailWithPassword(email);

    if (!isExist) {
      throw new ApiError(
        404,
        "User not found. Please check your email and try again."
      );
    }

    if (isExist?.status === "inactive") {
      throw new ApiError(
        403,
        "Your account is inactive. Please contact the support team or an administrator for assistance."
      );
    }

    const isMatchedPassword = await BcryptInstance.compare(
      password,
      isExist.password
    );

    if (!isMatchedPassword) {
      throw new ApiError(
        401,
        "Invalid password. Please try again or reset your password."
      );
    }

    const jwtPayload = {
      id: isExist?._id,
      email: isExist?.email,
    };

    const accessToken = await JwtInstance.generateAccessToken(jwtPayload);
    const refreshToken = await JwtInstance.generateRefreshToken(jwtPayload);

    return { accessToken, refreshToken };
  }

  async register(data: IRegister) {
    await UserService.createUser({
      name: data.name,
      email: data.email,
      role: data.role,
      password: data.password,
    });
  }

  async forgetPassword(email: string): Promise<void> {
    const user: any = await UserService.findUserByEmail(email);
    const token = await JwtInstance.generatePasswordResetToken(
      user?._id,
      user?.email
    );
    const resetUrl = `https://upskillium.vercel.app/auth/reset-password?id=${user?._id}$name=${user?.name}&email${user?.email}&token=${token}`;
    await MailService.resetPasswordLink(user?.email, resetUrl);
  }
}

export const AuthService = new Service();
