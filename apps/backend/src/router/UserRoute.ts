import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../db';
import bcrypt from "bcrypt"
import { JWT_SECRET } from '@repo/common';
const router = Router();

router.post('/signup',async(req:Request,res:Response)=>{
    const bodyData =req.body;
    const {username,password,email}=bodyData;
    

    const user =await  db.user.findFirst({
        where:{
            OR:[
                {username:username},
                {email:email}
            ]
        }
    })

    if(user){
         res.status(400).json({
            Message:"user already exist "
        })
        return 
    }
     const hashedPPass=await bcrypt.hash(password,10)



    const resp=await db.user.create({
        data:{
            username:username,
            email:email,
            password:hashedPPass
        }
    })
    const expiresIn='2h'

    const token =jwt.sign( {
       
        username:resp.username,
        email:resp.email
    } , JWT_SECRET, { expiresIn })



})
export default router;