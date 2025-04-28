import {
  registerUser,
  loginUser,
  logoutUser,
  changeUserAvatar,
  verifyEmail,
  resendVerifyEmail,
} from "../services/userServices.js";
import fs from "node:fs/promises";
import path from "node:path";

const avatarsDir = path.resolve("public", "avatars");

export const createUser = async (req, res) => {
  const new_user = await registerUser(req.body);
  res.status(201).json({
    user: { email: new_user.email, subscription: new_user.subscription },
  });
};

export const verifyEmailController = async (req, res) => {
  const { verificationToken } = req.params;
  await verifyEmail(verificationToken);
  res.status(200).json({ message: "Verification successful" });
};

export const resendVerifyEmailController = async (req, res) => {
  const { email } = req.body;
  await resendVerifyEmail(email);
  res.status(200).json({ message: "Verification email sent" });
};

export const signInUser = async (req, res) => {
  const user = await loginUser(req.body);
  res.status(200).json(user);
};

export const logOutUser = async (req, res) => {
  const { id } = req.user;
  await logoutUser(id);

  res.status(204).json();
};

export const getCurrentUser = (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    email,
    subscription,
  });
};

export const changeAvatar = async (req, res) => {
  const { id } = req.user;
  let avatar = null;
  if (req.file) {
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(avatarsDir, filename);
    await fs.rename(oldPath, newPath);
    avatar = path.join("avatars", filename);
  }
  const user = await changeUserAvatar(id, avatar);
  res.status(200).json({ avatarURL: user.avatarURL });
};
