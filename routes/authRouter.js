import express from "express";
import isEmptyBody from "../middleware/isEmptyBody.js";
import validateBody from "../middleware/validateBody.js";
import upload from "../middleware/fileUpload.js";
import { authUserSchema, verifyEmailSchema } from "../schemas/userSchemas.js";
import {
  createUser,
  signInUser,
  logOutUser,
  getCurrentUser,
  changeAvatar,
  verifyEmailController,
  resendVerifyEmailController,
} from "../controllers/userControllers.js";
import auth from "../middleware/authorization.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  upload.single("avatar"),
  isEmptyBody,
  validateBody(authUserSchema),
  createUser
);
authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(authUserSchema),
  signInUser
);
authRouter.post("/logout", auth, logOutUser);
authRouter.get("/current", auth, getCurrentUser);

authRouter.post(
  "/verify",
  isEmptyBody,
  validateBody(verifyEmailSchema),
  resendVerifyEmailController
);
authRouter.get("/verify/:verificationToken", verifyEmailController);

authRouter.patch("/avatars", auth, upload.single("avatar"), changeAvatar);

export default authRouter;
