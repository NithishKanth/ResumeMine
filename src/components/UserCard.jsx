"use client"
import React, { useEffect, useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from './ui/button';
import Image from 'next/image';
import { parseFullName } from 'parse-full-name';
import { useRouter } from 'next/navigation';
import { ProfileSetUp } from '@/actions/Setup';


const UserCard = ({session}) => {
    const { first:firstname } = parseFullName(session.user.name);
    const router = useRouter();


    useEffect(()=>{
      const ProfileAction = async()=>{
        const data = await ProfileSetUp();
      }
      ProfileAction();
    },[session]);
  return (
     <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-white px-5 py-6 border-black border-[3px]">
            <div className='flex items-center text-black gap-1'>
                <Image src={session.user.image} width={30} height={30} alt='user' className='rounded-full'/>
                <div className='text-xl'>{firstname}</div>
            </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
            <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={()=>{
          router.push("/profile")
        }}>
            <span>Resume</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator/>
        <DropdownMenuItem onClick={()=>{
            router.push("/api/auth/signout?callbackUrl=/")
        }}>
            <span className='text-red-600'>LogOut</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserCard