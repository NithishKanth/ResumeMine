"use client"
import Image from 'next/image'
import React from 'react'
import TempArray from '../../public/templates'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const Templates = () => {
    const router = useRouter();
  return (
    <div className='h-[600px] temp py-14 flex flex-col items-center'>
        <div className='text-[45px] font-semibold mb-9 text-center'>Resume Mine Templates<br/>Pick a Template and Build your Resume </div>
        <div className='flex gap-5 mb-10'>
            {(TempArray).map((temp,index)=>{
                return(
                    <div className=' trig relative w-[350px] h-[450px]  object-fill drop-shadow-xl mb-10 overflow-hidden flex items-center justify-center paper' key={index}>
                        <Image src={temp.pic}  className='object-contain size-full cursor-pointer'/>
                        <Button className="absolute btn translate-y-[620%]" onClick={()=>{
                            router.push(`/template/${temp.name}`)
                        }}>Use This</Button>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Templates