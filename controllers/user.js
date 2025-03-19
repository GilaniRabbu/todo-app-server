import { User } from "./../models/user.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(403).json({
        success: false,
        message: "Please fill all fields",
      });
    }
    // Finding email already registered
    const user = await User.findOne({ email });
    if (user) {
      return res.status(403).json({
        success: false,
        message: "Email already registered",
      });
    }
    // Hashing password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Creating new user
    await User.create({
      fullName,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "Please fill all fields",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "User not found",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(403).json({
        success: false,
        message: "Incorrect password",
      });
    }
    return res.status(200).json({
      success: true,
      message: `Welcome ${user.fullName}`,
    });
  } catch (error) {
    console.log(error);
  }
}