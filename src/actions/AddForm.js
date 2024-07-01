"use server";

import mongoose from "mongoose";
import { getSession } from "./Session";
import ProfileModel from "@/models/Profile";


export async function AddForm(data,field){
    const session = await getSession();
    const email = session?.user?.email;

    await mongoose.connect(process.env.MONGODB_URI);

    const Profile = await ProfileModel.findOneAndUpdate(
        { email },
        { $push: { [field]: data } },  // Using $push to add the new education object
        { new: true, upsert: true }  // upsert: true will create a new document if none is found
    );
}

export async function RemoveForm(data,field){
    const session = await getSession();
    const email = session?.user?.email;

    await mongoose.connect(process.env.MONGODB_URI);

    const Profile = await ProfileModel.findOneAndUpdate(
        { email },
        { $pull: { [field]: data } },  // Using $push to add the new education object
        { new: true, upsert: true }  // upsert: true will create a new document if none is found
    );
}