import express, { Router } from "express";
import { StripePaymentController } from "./controller";

const router = Router();

router.post("/checkout", StripePaymentController.checkout);

router.post(
  "/webhook",
  express.json({ type: "application/json" }),
  StripePaymentController.webhook
);

export const StripePaymentRoutes = router;
