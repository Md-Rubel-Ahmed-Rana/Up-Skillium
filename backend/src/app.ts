import express, { Application } from "express";
import dotenv from "dotenv";
import { RootRoutes } from "./modules/routes";
import { expressMiddlewares } from "./middlewares/expressMiddlewares";
import globalErrorHandler from "./errors/globalErrorHandler";
import { expressRouteNotFound } from "./errors/routeNotFound";
import { healthCheckRoute } from "./shared/appHealthCheck";
import { InvoiceService } from "./modules/pdf-creator/invoice.service";

dotenv.config();

const app: Application = express();

// express middlewares
expressMiddlewares(app);

// root route for app health check
healthCheckRoute(app);

// application routes
app.use("/api/v1", RootRoutes);

app.post("/create-invoice", async (req, res) => {
  try {
    await InvoiceService.createInvoice(req.body);
    res.status(200).json({ message: "Invoice created successfully" });
  } catch (error: any) {
    res.status(500).json({
      message: "Invoice creation failed",
      error: error?.message || error,
    });
  }
});

// 404 not found error
expressRouteNotFound(app);

// server error
app.use(globalErrorHandler.globalErrorHandler);

export default app;
