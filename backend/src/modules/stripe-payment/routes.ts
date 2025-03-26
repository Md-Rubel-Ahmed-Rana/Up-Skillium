import express, { Router } from "express";
import { StripePaymentController } from "./controller";
import { JwtInstance } from "../../lib/jwt";

const router = Router();

router.post(
  "/checkout",
  JwtInstance.verifyToken,
  StripePaymentController.checkout
);

router.post(
  "/webhook",
  express.json({ type: "application/json" }),
  StripePaymentController.webhook
);

export const StripePaymentRoutes = router;
