import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Users from '../models/RegisterSchema.js';
dotenv.config();

// REGISTER CONTROLLER
export const registerController = async (req, res) => {
  const { User_name, email, password, confirmPassword } = req.body;

  if (!User_name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const alreadyExists = await Users.findOne({ email });
    if (alreadyExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hash = bcrypt.hashSync(password, 10);
    const newUser = new Users({
      User_name,
      email,
      password: hash,
      confirmPassword: hash,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN CONTROLLER
export const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        User_name: user.User_name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// PROFILE CONTROLLER
export const profileController = async (req, res) => {
  try {
    const users = await Users.find({}, "-password"); // Exclude passwords
    res.status(200).json({ message: "User profile", users });
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
};
