import express from "express"
const app =express();
import dotenv from 'dotenv';

import {VALUE} from "@repo/common/config"
import User from "./router/UserRoute"
dotenv.config();
app.use(express.json());



app.use('/user',User);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});