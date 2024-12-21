import { Router } from "express";
import { CertificateController } from "./controller";

const router = Router();

router.post("/create", CertificateController.createCertificate);

router.get("/", CertificateController.getAllCertificate);

router.get("/:id", CertificateController.getSingleCertificate);

router.get(
  "/my-certificates/:userId",
  CertificateController.getCertificatesByUserId
);

router.get(
  "/instructor/:instructorId",
  CertificateController.getCertificatesByInstructor
);

router.patch("/:id", CertificateController.updateCertificate);

router.delete("/:id", CertificateController.deleteCertificate);

export const CertificateRoutes = router;
