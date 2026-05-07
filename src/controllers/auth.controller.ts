import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validateRegister, validateLogin } from "../validators/auth.validator";

//  REGISTER
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    //  validation
    const error = validateRegister(email, password);
    if (error) {
      return res.status(400).json({ msg: error });
    }

    // user mavjudmi
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ msg: "User exists" });
    }

    // hash
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashed,
    });

    //  password qaytarmaymiz
    res.status(201).json({
      id: user._id,
      email: user.email,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

//  LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    //  validation
    const error = validateLogin(email, password);
    if (error) {
      return res.status(400).json({ msg: error });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ msg: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};