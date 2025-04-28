import express from "express";
import isEmptyBody from "../middleware/isEmptyBody.js";
import validateBody from "../middleware/validateBody.js";
import { authUserSchema } from "../schemas/userSchemas.js";
import {
  createUser,
  signInUser,
  logOutUser,
  getCurrentUser,
} from "../controllers/userControllers.js";
import auth from "../middleware/authorization.js";

const authsRouter = express.Router();

authsRouter.post(
  "/register",
  isEmptyBody,
  validateBody(authUserSchema),
  createUser
);
authsRouter.post(
  "/login",
  isEmptyBody,
  validateBody(authUserSchema),
  signInUser
);
authsRouter.post("/logout", auth, logOutUser);
authsRouter.get("/current", auth, getCurrentUser);

export default authsRouter;
