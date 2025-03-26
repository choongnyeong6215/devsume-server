import express from "express";
import * as authMiddleware from "../middleware/auth.middleware.ts";
import * as resumeController from "../controllers/resume.controller.ts";
import upload from "../config/multer.ts";
import * as multerMiddleware from "../middleware/multer.middleware.ts";

const router = express.Router();

router.post(
  "",
  authMiddleware.validateAccessToken,
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "portfolio", maxCount: 3 },
  ]),
  multerMiddleware.validateUploadedFile,
  resumeController.createResume
);
router.get(
  "/:id",
  authMiddleware.validateAccessToken,
  resumeController.getResumeById
);
router.get(
  "/",
  authMiddleware.validateAccessToken,
  resumeController.getAllResume
);
router.patch(
  "/:id",
  authMiddleware.validateAccessToken,
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "portfolio", maxCount: 3 },
  ]),
  multerMiddleware.validateUploadedFile,
  resumeController.updateResume
);
router.delete(
  "/:id",
  authMiddleware.validateAccessToken,
  resumeController.deleteResume
);

export default router;
