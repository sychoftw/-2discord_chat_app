import express from 'express';
import dotenv from 'dotenv';
dotenv.config();


import userRouter from './router/UserRoute'; 

const app = express();

app.use(express.json());

app.use('/user', userRouter); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port `,PORT);
});

