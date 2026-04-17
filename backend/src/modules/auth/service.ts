import { UserService } from "../user/service";
import { IRegister } from "./interface";
import { MailService } from "../mail/mail.service";
import { IUser } from "../user/interface";
import ApiError from "@/shared/apiError";
import { BcryptInstance } from "@/lib/bcrypt";
import { JwtInstance } from "@/lib/jwt";
import { HttpStatusCode } from "@/lib/httpStatus";

class Service {
  async auth(id: string) {
    const user = await UserService.findUserById(id);
    if (user?.status === "inactive") {
      throw new ApiError(
        HttpStatusCode.UNAUTHORIZED,
        "Your account is inactive. Please contact the support team or an administrator for assistance.",
      );
    }
    return user;
  }
  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string; user: IUser }> {
    const isExist: any = await UserService.findUserByEmailWithPassword(email);

    if (!isExist) {
      throw new ApiError(
        HttpStatusCode.NOT_FOUND,
        "User not found. Please check your email and try again.",
      );
    }

    if (isExist?.status === "inactive") {
      throw new ApiError(
        HttpStatusCode.UNAUTHORIZED,
        "Your account is inactive. Please contact the support team or an administrator for assistance.",
      );
    }

    const isMatchedPassword = await BcryptInstance.compare(
      password,
      isExist.password,
    );

    if (!isMatchedPassword) {
      throw new ApiError(
        401,
        "Invalid password. Please try again or reset your password.",
      );
    }

    const jwtPayload = {
      id: isExist?._id,
      email: isExist?.email,
      role: isExist?.role?.name || "unknown role",
    };

    const accessToken = await JwtInstance.generateAccessToken(jwtPayload);
    const refreshToken = await JwtInstance.generateRefreshToken(jwtPayload);

    delete isExist?.password;

    return { accessToken, refreshToken, user: isExist };
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
      user?.email,
      user?.role?.name || "unknown role",
    );
    const resetUrl = `https://upskillium.vercel.app/auth/reset-password?id=${user?._id}&name=${user?.name}&email=${user?.email}&token=${token}`;
    await MailService.resetPasswordLink(user?.email, resetUrl);
  }
}

export const AuthService = new Service();
