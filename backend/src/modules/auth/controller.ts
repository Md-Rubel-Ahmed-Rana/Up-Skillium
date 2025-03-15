import { Request, Response } from "express";
import RootController from "../../shared/rootController";
import { AuthService } from "./service";
import { cookieManager } from "../../shared/cookies";

class Controller extends RootController {
  auth = this.catchAsync(async (req: Request, res: Response) => {
    const id: any = req?.id;
    const result = await AuthService.auth(id);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "User fetched  successfully",
      data: result,
    });
  });

  register = this.catchAsync(async (req: Request, res: Response) => {
    await AuthService.register(req.body);
    this.apiResponse(res, {
      statusCode: 201,
      success: true,
      message: "User registered successfully",
      data: null,
    });
  });

  login = this.catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await AuthService.login(
      email,
      password
    );
    cookieManager.setTokens(res, accessToken, refreshToken);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Login successful",
      data: null,
    });
  });

  logout = this.catchAsync(async (req: Request, res: Response) => {
    cookieManager.clearTokens(res);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Logout successful",
      data: null,
    });
  });

  forgetPassword = this.catchAsync(async (req: Request, res: Response) => {
    const email = req.body.email as string;
    await AuthService.forgetPassword(email);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message:
        "A password reset link has been sent to your email. Please check your inbox or spam folder and follow the instructions to reset your password.",
      data: null,
    });
  });

  verifyResetPasswordToken = this.catchAsync(
    async (req: Request, res: Response) => {
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Proceed to reset your password",
        data: null,
      });
    }
  );
}

export const AuthController = new Controller();
