import { Router } from "express";
import { CertificateController } from "./controller";

const router = Router();

router.post("/create", CertificateController.createCertificate);

export const CertificateRoutes = router;
