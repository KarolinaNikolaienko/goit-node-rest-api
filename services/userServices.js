import User from "../db/models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import generateAvatarUrl from "../helpers/avatarGenerator.js";

const { JWT_SECRET } = process.env;

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
  return User.create({ ...body, password: hashpass, avatarURL });
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
