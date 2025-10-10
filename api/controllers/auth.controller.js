import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const signup = async (req, res, next) => {
  // console.log(req.body);
// status(201) is for creation
// after status below check data base if user was created
// we hash the password before saving to db using bcrypt
// hashSync(password, 10) 10 is the strength of the hash
// 10: called salt rounds


  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
    try {
      
      await newUser.save();
      res.status(201).json({ message: "User signed up successfully!"})

    } catch (error) {
      // res.status(500).json({ message: "Error signing up user", error })
      next(error); 
    }
};
   