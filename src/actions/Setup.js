"use server"
import ProfileModel from "@/models/Profile";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";


export async function ProfileSetUp() {
    await mongoose.connect(process.env.MONGODB_URI);
    const session = await getServerSession(authOptions);

    const email = session?.user?.email;
    const name  = session?.user?.name;

    let person = await ProfileModel.findOne({email});

    if(!person){
        person = await ProfileModel.create({email,name});
    }

    return (person.toObject());
}