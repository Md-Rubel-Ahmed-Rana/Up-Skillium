import { JwtInstance } from "../../lib/jwt";
import ApiError from "../../shared/apiError";
import { BcryptInstance } from "../../lib/bcrypt";
import { UserService } from "../user/service";
import { IRegister } from "./interface";

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
      throw new ApiError(404, "User not found!");
    }

    const isMatchedPassword = await BcryptInstance.compare(
      password,
      isExist?.password
    );
    if (!isMatchedPassword) {
      throw new ApiError(401, "Password doesn't match");
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
}

export const AuthService = new Service();
