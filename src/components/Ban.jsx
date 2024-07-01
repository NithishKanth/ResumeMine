"use client";

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from './ui/button';

gsap.registerPlugin(ScrollTrigger);

const Ban = () => {
    const scrollRef = useRef(null);


    useEffect(() => {
        if (scrollRef.current) {
            const element = scrollRef.current;
            const height = element ? element.offsetHeight : 0;
            const width = element ? element.offsetWidth : 0;

            gsap.fromTo("#banner",{
                x:0,
                y:0
            }, {
                y: height,
                x:width/2,
                duration: 3,
                scrollTrigger: {
                    trigger: ".prof",
                    start:"start bottom",
                    end: "top 20%",
                    scrub: true
                },
                ease: "power1.inOut"
            });

            gsap.fromTo("#personal",{
                opacity:0,
            },{
                opacity:1,
                scrollTrigger: {
                    trigger: ".prof",
                    start:"start bottom",
                    end: "top 5%",
                    scrub: true
                },
                ease:"power1.inOut"
            })
        }
    }, [scrollRef.current]);

    return (
        <div className='px-28 hero-2 prof h-[600px] overflow-hidden flex items-center' ref={scrollRef}>
            <div id='personal' className='bg-white rounded-[20px] px-14 py-8 max-w-[620px]'>
                <div className='font-semibold text-xl mb-5'>Build Your Perfect Resume in Minutes</div>
                <div className='mb-4'>
                Create a professional resume effortlessly with our user-friendly builder. Choose from a variety of customizable templates, tailor your content, and land your dream job. Get started now and stand out from the competition!
                </div>
                <div className=''>
                    <li>Easy to Use: Intuitive drag-and-drop interface.</li>
                    <li>Customizable Templates: Professional designs to fit your style.</li>
                    <li>Instant Download: Get your resume in PDF format instantly.</li>
                    <div className='mt-5 font-bold'>Start Building Your Resume Today!</div>
                </div>
                <Button className="mt-5">Build Your Resume</Button>
            </div>
        </div>
    );
}

export default Ban;
