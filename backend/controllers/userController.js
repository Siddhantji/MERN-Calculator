const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { user, password } = req.body;
  const existingUser = User.findOne(user);
  if(existingUser){
    return res.status(400).json({message: 'Username already taken'});
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ user, hashPassword });
  await newUser.save();
  res.status(201).json({ message: "User created successfully" });
};

const login = async (req, res) => {
  const { user, password } = req.body;
  const userData = await User.findOne({ user });
  console.log(userData);
  if (!userData || !(await bcrypt.compare(password, userData.password))) {
    res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
};

module.exports = {
  register,
  login,
};
