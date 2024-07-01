"use client"
import { getSession } from '@/actions/Session';
import { ProfileSetUp } from '@/actions/Setup';
import React, { useEffect, useRef, useState } from 'react'
import { LuDot } from "react-icons/lu";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Button } from '@/components/ui/button';
import DataCards from '@/components/DataCards';

const page = () => {
  const [user,setUser] = useState({});
  const [info ,setInfo] = useState({});

  const resumeTemplateRef = useRef(null);

  const generatePdf = async ()=>{
    const inputData  = resumeTemplateRef.current;
    try {
      const canvas = await html2canvas(inputData);
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation:"portrait",
        unit:"px",
        format:"a4"
      })

      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData ,"PNG", 0 ,0 ,width,height);
      pdf.save("Demo.pdf")
    } catch (error) {
      
    }
  }

  const [loading, setLoading] = useState(true);
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
        {/* <Button onClick={async()=>{
          await generatePdf();
        }}>Download</Button> */}
        <DataCards 
          info={info}
          fetchData={fetchData}
        />
      </div>
      <div className='paper flex-1 px-10 py-8' ref={resumeTemplateRef}>
        <div className=' text-[#488193] font-semibold text-2xl'>{info.name}</div>
        <div className='text-gray-700 font-medium'>{info.role}</div>
        <div className='flex items-center text-gray-600'>
          <div>{info.location}</div>
          <div><LuDot /></div>
          <div>{info.number}</div>
          <div><LuDot /></div>
          <div>{info.email}</div>
          <div><LuDot /></div>
          <div>linkedin.com/in/username</div>
        </div>
        <div className='mt-2 text-justify  text-gray-500'>
          {info.summary}
        </div>
        <div className='text-[#488193] py-4 font-bold'>
          RELEVANT WORK EXPERIENCE
        </div>
        <div className='w-full h-[1px] bg-gray-500 mb-4'>
        </div>
        <div className='flex flex-col gap-2'>
          {(info.works).map((work)=>{
            return(
              <div>
                <div className='text-gray-700 font-semibold flex items-center justify-between'>
                  <div>{work.firmname}, {work.city}, {work.state} </div>
                  <div className='text-black'>{work.startYear} - {work.endYear}</div>
                </div>
                <div className='text-gray-600 font-medium'>{work.role}</div>
                <div className='py-2 px-6 text-gray-600 text-justify'>
                  {work.workdesc}
                </div>
              </div>
            )
          })}
        </div>
        <div className='text-[#488193] py-4 font-bold text-xl'>
          Education
        </div>
        <div className='w-full h-[1px] bg-gray-500 mb-4'>
        </div>
        <div className='flex flex-col-reverse gap-2'>
          {(info.education).map((edu)=>{
            return(
              <div>
                <div className='text-gray-700 font-semibold flex items-center justify-between'>
                  <div>{edu.qualification}, {edu.stream}</div>
                  <div>{edu.to}</div>
                </div>
                <div>From {edu.name} with {((edu.cgpa)*9.5).toFixed(2)}%</div>
              </div>
            )
          })}
        </div>
        <div className='text-[#488193] py-4 font-bold text-xl'>
          Skills
        </div>
        <div className='w-full h-[1px] bg-gray-500 mb-4'>
        </div>
        <div className='flex items-center flex-wrap gap-1'>
          <div className='font-semibold'>Technical Skills:</div>
          {(info.skills).map((skill)=>{
            return(
              <div>{skill.name}({skill.level}), </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default page