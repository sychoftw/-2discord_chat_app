import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { VALUE } from '@repo/common/config';
import userRouter from './router/UserRoute'; // ✅ Make sure this matches your export

const app = express();

app.use(express.json());

app.use('/user', userRouter); // ✅ Mounts your /signup as /user/signup

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port `,VALUE);
});
