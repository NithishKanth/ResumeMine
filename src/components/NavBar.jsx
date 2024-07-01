import React from 'react'
import { IoDiamondOutline } from "react-icons/io5";
import { getServerSession } from 'next-auth';
import UserCard from './UserCard';
import Link from 'next/link';
import { authOptions } from '@/pages/api/auth/[...nextauth].js';


const NavBar = async () => {

    const session = await getServerSession(authOptions);

  return (
    <div className='py-7 px-32 text-black sticky top-0 flex items-center justify-between bg-white z-50'>
        <div className='flex items-center gap-1 z-50'>
            <div className='text-3xl flex gap-2 font-bold z-50'>Resume<span className='flex gap-[0.5px] items-center text-yellow-800'>Mi<IoDiamondOutline  size={30} />e</span></div>
        </div>
        <div className='bg-white z-50'>
            {(session)? 
                <UserCard session={session}/>
                :
                <Link href={'/api/auth/signin'} className='bg-black py-3 px-6 rounded-[10px] text-white font-semibold'>Login</Link>
            }
        </div>
    </div>
  )
}

export default NavBar