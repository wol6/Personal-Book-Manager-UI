import { connectMongoDb } from "../../../../../lib/mongodb"
import UserModel from "../../../../../models/user"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(req) {
    try{
        await connectMongoDb()
        
        const body = await req.json()
        const {name,email,password} = body.registerObj

        if(!name||!email||!password){
            return NextResponse.json({message:"All Fields Required"})
        }

        const userExists = await UserModel.findOne({email})
        if(userExists){
            return NextResponse.json({message:"User already exists"})
        }

        const hashPassword = await bcrypt.hash(password,10)

        await UserModel.create({name,email,password:hashPassword})
        return NextResponse.json({message:"User Register Successfully"})
    }catch(err){
        console.log("Registration failed",err)
    }
}