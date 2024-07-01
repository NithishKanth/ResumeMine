"use server"
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import ProfileModel from "@/models/Profile";

export async function PersonalData({name,DOB,number,gender,location,position,url}){
    await mongoose.connect(process.env.MONGODB_URI);

     const session = await getServerSession(authOptions);

     const profile = await ProfileModel.findOneAndUpdate(
        {email:session?.user?.email},
        {gender,number,name,location,DOB,role:position,linkUrl:url},
        {new:true}
    )
}