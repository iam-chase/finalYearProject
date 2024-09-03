import userObject from "../utils/userObject.js";


import { createToken } from "../utils/token.js";
import User from "../models/User.js";

export const register = async (req, res, next) => {
  /**
   * Registration controller
   *@find:Finds if there is already an email in use
   @params:Takes email and password
   @return:Returns a success message telling user to verify email through an email message
   */
  const { name, email, password } = req.body;
  if (!password || !email) {
    return res.status(400).json("Please fill all values");
  }
  const userAlreadyExist = await User.findOne({ email });
  if (userAlreadyExist) {
    return res.status(400).json("This email is already in use!");
  }
  //Want to set the first user to register as Admin
  const isFirstUser = (await User.countDocuments({})) === 0;
  const role = isFirstUser ? "admin" : "user";

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  const token = createToken({
    payload: { id: user.id, email: user.email, role: user.role },
  });

  const userObj = userObject(user);
 
  return res.status(200).json({user:userObj, token})

};


export const login = async (req, res, next) => {
  /***
   * Login controller
   * @function:Logs user in
   * @prams:Takes email and password from body
   * @return:Returns user with jwt token if user is found in the database
   */
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("Please provide all values");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(400).json("Invalid credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return res.status(400).json("Invalid credentials");
  }

  if (user.isVerified === false) {
    return res.status(400).json("Please verify your email to continue");
  }

  const token = createToken({
    payload: { id: user.id, email: user.email, role: user.role },
  });

  const userObj = userObject(user);
  // Return success response with user data and token
  res.status(200).json({ user: userObj, token });
};

export const getAllUsers = async (req, res, next) => {
  /**
   * @return:Returns all users on the platform
   */
  const users = await User.find({ role: "user" })
    .select("-password")
    .sort({ createdAt: -1 });
  if (!users?.length > 0)
    return res.status(404).json("No users on the platform yet");
  res.status(200).json({ users, count: users.length });
};

export const loggedInUser = async (req, res, next) => {
  res.status(200).json({ user: req.user });
};


