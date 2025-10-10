import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';

mongoose.connect(process.env.MONGO_URL)
.then(() => {
  console.log("Connected to Mongodb!")
})
.catch((err) => {
  console.log(err)
})

const app = express();

// helps to get data from req.body
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.listen(4000, () => {
  console.log('Server is running on port 4000!');
}
); 
