import { Router } from "express";
import { CertificateController } from "./controller";
import { JwtInstance } from "../../lib/jwt";

const router = Router();

router.post(
  "/create",
  JwtInstance.verifyToken,
  CertificateController.createCertificate
);

router.get(
  "/",
  JwtInstance.verifyToken,
  CertificateController.getAllCertificate
);

router.get(
  "/:id",
  JwtInstance.verifyToken,
  CertificateController.getSingleCertificate
);

router.get(
  "/my-certificates/:userId",
  JwtInstance.verifyToken,
  CertificateController.getCertificatesByUserId
);

router.get(
  "/instructor/:instructorId",
  JwtInstance.verifyToken,
  CertificateController.getCertificatesByInstructor
);

router.patch(
  "/:id",
  JwtInstance.verifyToken,
  CertificateController.updateCertificate
);

router.delete(
  "/:id",
  JwtInstance.verifyToken,
  CertificateController.deleteCertificate
);

export const CertificateRoutes = router;
