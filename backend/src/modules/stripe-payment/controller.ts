import { Request, Response } from "express";
import RootController from "../../shared/rootController";
import { StripePaymentService } from "./service";

class Controller extends RootController {
  checkout = this.catchAsync(async (req: Request, res: Response) => {
    const result = await StripePaymentService.checkout(req.body);
    this.apiResponse(res, {
      statusCode: 201,
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  });

  webhook = this.catchAsync(async (req: Request, res: Response) => {
    await StripePaymentService.webHook(req.body);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Event triggered from Webhook successfully",
      data: { received: true },
    });
  });
}

export const StripePaymentController = new Controller();
