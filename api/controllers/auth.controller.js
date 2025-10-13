import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  // console.log(req.body);
  // status(201) is for creation
  // after status below check data base if user was created
  // we hash the password before saving to db using bcryptjs
  // hashSync(password, 10) 10 is the strength of the hash
  // 10: called salt rounds

  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User signed up successfully!" });
  } catch (error) {
    // res.status(500).json({ message: "Error signing up user", error })
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found!"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong Credentials!"));
    }

    //Generate JWT token for a valid user
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);

    //Hide password before sending user data to client
    const { password: pass, ...rest } = validUser._doc; //destructuring to exclude password from user data
    
    //Send token in HTTP-only cookie
      res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);

  } catch (error) {
    next(error);
  }
};




//Install JWT package
