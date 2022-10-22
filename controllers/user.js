const User = require("../models/user");
const AppError = require("../utils/appError");

exports.registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  const alreadyRegistered = await User.findOne({ email });
  if (alreadyRegistered)
    throw new AppError("User with this email is already Registered", 401);

  const usernameTaken = await User.findOne({ username });

  if (usernameTaken) throw new AppError("This Username is already taken", 401);

  const user = new User({ username, email, password });
  await user.save();
  req.session.user_id = user._id;
  res.send({ message: "The user has been registered Successfully", user });
};

exports.loginUser = async (req, res) => {
  // If the user already have unexpired cookies and we want to keep him logged in
  if (!req.body.username) {
    if (req.session.user_id) {
      const user = await User.findById(req.session.user_id);
      return res.send({ user });
    }
    return res.send({ message: "User needs to login" });
  }

  const { username, password } = req.body;
  const user = await User.authenticate(username, password);
  if (!user) throw new AppError("Invalid Email or Password", 401);
  req.session.user_id = user._id;
  delete user.password;
  res.send({ message: "User has been logged in Successfully", user });
};

exports.logoutUser = async (req, res) => {
  req.session.user_id = null;
  res.send({ message: "You have been successfully Logged out" });
};
