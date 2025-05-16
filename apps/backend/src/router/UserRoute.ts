import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../db';
import bcrypt from "bcrypt"
import {JWT_SECRET} from "@repo/common/config"

const router = Router();

router.post('/signup', async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  const user = await db.user.findFirst({
    where: {
      OR: [{ username }, { email }]
    }
  });

  if (user) {
     res.status(400).json({
      message: "User already exists"
    });
    return
  }

  const hashedPass = await bcrypt.hash(password, 10);

  const resp = await db.user.create({
    data: {
      username,
      email,
      password: hashedPass
    }
  });

  const expiresIn = '2h';
  const token = jwt.sign(
    {
      username: resp.username,
      email: resp.email
    },
    JWT_SECRET,
    { expiresIn }
  );

 
   res.status(201).json({
    message: "User created successfully",
    token,
    user: {
      id: resp.id,
      username: resp.username,
      email: resp.email
    }
  });
  return
});



//singin
router.post('/signin', async (req: Request, res: Response) => {
  const {  password, email } = req.body;

  const user = await db.user.findUnique({
    where: {
      email
    }
  });

  if (!user) {
     res.status(400).json({
      message: "need to sign up first"
    });
    return
  }
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    res.status(400).json({ message: "Invalid credentials" });
    return;
  }

  

  const expiresIn = '2h';
  const token = jwt.sign(
    {
      username: user.username,
      email: user.email
    },
    JWT_SECRET,
    { expiresIn }
  );

 
   res.status(201).json({
    message: "user logged in successfully",
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email
    }
  });
  return
});

export default router; 
