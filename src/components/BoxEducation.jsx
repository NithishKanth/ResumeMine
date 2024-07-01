import { RemoveForm } from '@/actions/AddForm';
import React from 'react'
import { MdDelete } from "react-icons/md";

const BoxEducation = ({info,fetchData}) => {
  return (
    <div className='p-8 paper rounded-[9px]'>
      <div className='text-xl font-semibold mb-5'>Education</div>
      <div className='flex flex-col-reverse gap-3'>
        {(info.education)?.map((edu)=>{
          return(
            <div className='shad rounded-[12px] p-3 flex justify-between items-center'>
              <div>
                <div><span className='font-semibold'>{edu.qualification}</span> from {edu.name}</div>
              </div>
              <div>
                <MdDelete size={20} color='#822727' className='cursor-pointer' onClick={async()=>{
                  await RemoveForm(edu,'education');
                  await fetchData()
                }}/>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BoxEducation