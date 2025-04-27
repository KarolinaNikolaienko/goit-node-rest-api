import {
  registerUser,
  loginUser,
  logoutUser,
} from "../services/userServices.js";

export const createUser = async (req, res) => {
  const new_user = await registerUser(req.body);
  res.status(201).json({
    user: { email: new_user.email, subscription: new_user.subscription },
  });
};

export const signInUser = async (req, res) => {
  const user = await loginUser(req.body);
  res.status(200).json(user);
};

export const logOutUser = async (req, res) => {
  const { id } = req.user;
  // console.log("controller", id);
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
