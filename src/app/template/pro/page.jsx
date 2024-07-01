"use client"
import { getSession } from '@/actions/Session';
import { ProfileSetUp } from '@/actions/Setup';
import DataCards from '@/components/DataCards';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const page = () => {
    const [loading,setLoading] = useState(false);
    const [user,setUser] = useState({});
    const [info,setInfo] = useState({});
    const resumeTemplateRef = useRef();

    const generatePdf = async ()=>{
        const inputData  = resumeTemplateRef.current;
        try {
          const canvas = await html2canvas(inputData);
          const imgData = canvas.toDataURL("image/png");
    
          const pdf = new jsPDF({
            orientation:"portrait",
            unit:"mm",
            format:"a4"
          })
    
          const width = pdf.internal.pageSize.getWidth();
          const height = pdf.internal.pageSize.getHeight();
    
          pdf.addImage(imgData ,"PNG", 0 ,0 ,width,height);
          pdf.save(`resume.pdf`)
        } catch (error) {
          
        }
      }

    const fetchSession = async ()=>{
        const session = await getSession();
        setUser(session.user);
    }
    const fetchData = async () =>{
        const values = await ProfileSetUp();
        setInfo(values);
    }
    useEffect(()=>{
        const fetchDataAsync = async () => {
          setLoading(true);
          await fetchSession();
          await fetchData();
          setLoading(false);
        };
    
        fetchDataAsync();
    },[]);


    if(loading){
        return(
          <div className='flex items-center justify-center h-full'>
            <div class="loader border-t-2 rounded-full border-black bg-gray-300 animate-spin aspect-square w-8 flex justify-center items-center text-yellow-700">
            </div>
          </div>
        )
      }
  return (
    <div className='flex gap-6 p-9'>
        <div className='flex-1'>
            <DataCards 
                info={info}
                fetchData={fetchData}
            />
            <Button className="mt-4" onClick={()=>{
                generatePdf()
            }}>Download</Button>
        </div>
        <div className='paper flex-1 p-5 relative A4' ref={resumeTemplateRef}>
            <div className='relative w-full border-b-4 px-5 py-8 flex items-center justify-between gap-3 border-gray-400'>
                <div className='flex-1 h-fit'>
                    <div className='uppercase font-semibold text-2xl'>
                        {info.name}
                    </div>
                    <div className='text-gray-700 font-semibold text-lg'>
                        {info.role}
                    </div>
                </div>
                <div className='items'>
                    <div className='flex items-center gap-1.5'>
                        <Image src={'/icons/phone.svg'} width={20} height={20} alt='s'/>
                        <div>{info.number}</div>
                    </div>
                    <div className='flex items-center gap-1.5'>
                        <Image src={'/icons/mail.svg'} width={20} height={20} alt='s'/>
                        <div>{info.email}</div>
                    </div>
                    <div className='flex items-center gap-1.5'>
                        <Image src={'/icons/location.svg'} width={20} height={20} alt='s'/>
                        <div>{info.city}, {info.location}</div>
                    </div>
                </div>
            </div>
            <div className='px-5 py-8 flex justify-center'>
                <div className='border-r-4 pr-[5px] w-[35%] border-gray-400'>
                    <div className='flex mr-3 flex-col gap-2 border-b-4 border-gray-400 py-3'>
                        <span className='font-semibold text-[22px]'>Education</span>
                        <div className='flex flex-col-reverse gap-2'>
                            {(info.education)?.map((edu)=>{
                                return(
                                    <div className='text-[14px]'>
                                        <div className='font-semibold'>
                                            {edu.qualification} | {edu.stream}
                                        </div>
                                        <div>{edu.name}</div>
                                        <div>
                                            {((edu.to)<(new Date().getFullYear()))?`Passed: ${edu.to},Score : ${(edu.cgpa*9.5).toFixed(1)}%`:`Expected Graduation: ${edu.to}, Cgpa: ${edu.cgpa}`}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className='py-3 mr-3 border-b-4 border-gray-400'>
                        <span className='font-semibold text-[22px]'>Skills</span>
                        <div>
                            {(info.skills)?.map((skill)=>{
                                return(
                                    <li>{skill.name}</li>
                                )
                            })}
                        </div>
                    </div>
                    <div className='py-3 mr-3 border-b-4 border-gray-400'>
                        <span className='font-semibold text-[22px]'>Certificates</span>
                        <div>
                            {(info.certificates)?.map((cer)=>{
                                return(
                                    <li className='inline'>
                                        <div>
                                            <div>{cer.name}</div>
                                            <div>{cer.from}</div>
                                        </div>
                                    </li>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className='flex-1 py-3 px-3 flex flex-col gap-4'>
                    <div>
                        <span className='font-semibold text-[22px]'>Summary</span>
                        <div className='text-justify text-[15px]'>
                            {info.summary}
                        </div>
                    </div>
                    <div>
                        <span className='font-semibold text-[22px]'>Projects and Experience</span>
                        <div className='py-1 flex flex-col gap-4'>
                            {(info.projects)?.map((pro)=>{
                                return (
                                    <div className='relative py-1'>
                                        <div className='flex items-center justify-between font-semibold text-[19px] py-5'>
                                            <div>{pro.name}</div>
                                            <div className='text-[15px]'>({pro.startMonth} {pro.startYear} - {pro.endMonth} {pro.endYear})</div>
                                        </div>
                                        <div className='text-justify text-[15px] whitespace-pre-line'>
                                            {pro.desc}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page