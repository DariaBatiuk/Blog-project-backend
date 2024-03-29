import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import UserModel from "../models/User.js";

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Registration failed",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    //cheking if the user is not in the system
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    //checking if the passwird is wrong
    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return res.status(404).json({
        message: "Wrong login or password",
      });
    }

    //if the user exists and the password is correct
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );
    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
		console.log(err);
    res.status(500).json({
      message: "Authorization failed",
    });
	}
};

export const getMe = async (req, res) =>{
	try{
		const user = await UserModel.findById(req.userId);

		if(!user){
			return res.status(404).json({
				message: "User not found"
			});
		};

		const { passwordHash, ...userData } = user._doc;

    res.json(userData);
	} catch(err){
		console.log(err);
    res.status(500).json({
      message: "No access",
    });
	}
}