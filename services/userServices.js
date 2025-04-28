import User from "../db/models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import generateAvatarUrl from "../helpers/avatarGenerator.js";
import sendMail from "../helpers/sendEmail.js";
import { nanoid } from "nanoid";
import { where } from "sequelize";
import { verify } from "crypto";

const { JWT_SECRET, APP_DOMAIN } = process.env;

const getVerificationEmail = (email, verificationToken) => ({
  to: email,
  subject: "Registration verification",
  html: `<a href="${APP_DOMAIN}/api/auth/verify/${verificationToken}" target="_blank">Verify email</a>`,
});

export const registerUser = async (body) => {
  const { email, password } = body;
  let { avatarURL } = body;
  if (!avatarURL) avatarURL = generateAvatarUrl(email);
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user) throw HttpError(409, "Email in use");
  const hashpass = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();
  const new_user = await User.create({
    ...body,
    password: hashpass,
    avatarURL,
    verificationToken,
  });

  await sendMail(getVerificationEmail(email, verificationToken));

  return new_user;
};

export const verifyEmail = async (verificationToken) => {
  const user = await User.findOne({
    where: {
      verificationToken,
    },
  });
  if (!user) {
    throw HttpError(404, "User not found or Email already verified");
  }
  await user.update({ verificationToken: null, verify: true });
};

export const resendVerifyEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }
  await sendMail(getVerificationEmail(email, user.verificationToken));
};

export const loginUser = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  if (!user.verify) {
    throw HttpError(401, "Email not verified");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    email,
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "24h",
  });

  await user.update({ token });

  return {
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  };
};

export const logoutUser = async (id) => {
  const user = await User.findOne({
    where: {
      id,
    },
  });
  if (!user || !user.token) {
    throw HttpError(401, "Not authorized");
  }

  await user.update({ token: null });
};

export const changeUserAvatar = async (id, avatarURL) => {
  const user = await User.findOne({
    where: {
      id,
    },
  });
  if (!user || !user.token) {
    throw HttpError(401, "Not authorized");
  }
  await user.update({ avatarURL });
  return user;
};
