import express from "express";
import * as authMiddleware from "../middleware/auth.middleware.ts";
import * as resumeController from "../controllers/resume.controller.ts";
import upload from "../config/multer.ts";

const router = express.Router();

router.post(
  "",
  authMiddleware.validateAccessToken,
  upload.single("profileImg"),
  resumeController.createResume
);
router.get(
  "/:id",
  authMiddleware.validateAccessToken,
  resumeController.getResume
);
router.get(
  "/",
  authMiddleware.validateAccessToken,
  resumeController.getAllResume
);
router.patch(
  "/:id",
  authMiddleware.validateAccessToken,
  upload.single("profileImg"),
  resumeController.updateResume
);
router.delete(
  "/:id",
  authMiddleware.validateAccessToken,
  resumeController.deleteResume
);

export default router;
