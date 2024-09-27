const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { userName, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ userName });
  if (existingUser) {
    return res.status(400).json({ message: "Username already taken" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new User({ userName, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: "User created successfully" });
};

const login = async (req, res) => {
  const { userName, password } = req.body;

  // Check if the user exists
  const userData = await User.findOne({ userName });
  if (!userData || !(await bcrypt.compare(password, userData.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate a JWT token
  const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
};

module.exports = {
  register,
  login,
};
