import jwt from "jsonwebtoken"
import {JWT_SECRET} from "@repo/common/config"
export default async function UserExtraction(token:string){
     const decoded=await jwt.verify(token,JWT_SECRET)
     return decoded
}