"use client"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import React from 'react'
import { IoDiamondOutline } from "react-icons/io5";
import { Button } from './ui/button'


const Hero = () => {
    useGSAP(()=>{
        gsap.to("#banner",{
            x:0,
            y:0,
            opacity:1,
            duration:0.8,
        })

        gsap.to("#diamond",{
            y:-400,
            x:-90,
            rotation:-50,
            duration:1,
            opacity:1
        })

        gsap.to("#title",{
            y:0,
            duration:1,
            ease:"bounce.out",
            opacity:1
        })
        gsap.to("#spin",{
            rotation:360,
            duration:6,
            repeat:-1,
        })
    },[]);
  return (
    <div className='Hero flex items-center px-40 gap-10 -z-50 '>
        <div className='relative z-40'>
            <Image src={"/image/Banner.svg"} width={380} height={380} alt='img' className='-translate-x-full opacity-0 z-50' id='banner'/>
            <IoDiamondOutline size={170} color='rgb(133 77 14)' id='diamond' className='absolute opacity-0 -z-10'/>
        </div>
        <div className='flex-1 hero-banner relative -z-50'>
            <div className='text-[50px] font-medium ls'>Welcome To Online</div>
            <div className='text-[50px] font-medium ls text-[#854d0e] opacity-0 translate-y-3' id='title'>
                Resume Mine
            </div>
            <div className='text-xl'>Create professional resumes with ease</div>
            <div className='mt-5 text-xl text-gray-900'>
            Resume Mine is your go-to tool for building stunning, professional resumes. Whether you're a seasoned professional or just starting your career, our easy-to-use platform helps you craft resumes that stand out. Start now and take the first step toward landing your dream job!
            </div>
            <Button className="mt-9 bg-[#854d0e] hover:bg-[#cf8430] py-7 px-8 text-[20px]">Build Your Resume</Button>
            <IoDiamondOutline size={180} id='spin' className='absolute top-4 left-[90%] -z-10'/>
        </div>
    </div>
  )
}

export default Hero