import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from "@/lib/db";

export const authOptions ={
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_SECRET,
        }),
    ],
    adapter:MongoDBAdapter(clientPromise)
}

export default NextAuth(authOptions);