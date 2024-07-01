"use client"
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogDescription,
    DialogHeader,
    DialogClose,
}
from './ui/dialog';
import { Course, boards, qualification, specialization, yrs } from '@/constant/values'
import SelectBox from './SelectBox'
import { AddForm } from '@/actions/AddForm'

const Education = ({user,fetchData}) => {
  const [education,setEducation] = useState({
    qualification:"",
    name:"",
    stream:"",
    specialization:"",
    from:"",
    to:"",
    cgpa:""
  });
  useEffect(()=>{
    console.log(education);
  },[education]);
  return (
    <div className='bg-white py-7 px-8 rounded-xl drop-shadow-lg'>
        <div className='text-[18px] font-semibold flex items-center justify-between'>
            <div>Education</div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Add</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[650px]">
                <DialogHeader className={'font-semibold text-xl mb-9'}>
                  Add Education
                  <DialogDescription>
                Adding your educational details help recruiters know  your value
                </DialogDescription>
                </DialogHeader>
                <div className='flex flex-col gap-6'>
                  <div className='inp'>
                    <Label className="font-semibold">Degree/Qualification</Label>
                    <SelectBox 
                      text={'Select a Qualification'} 
                      values={qualification}
                      type={"qualification"}
                      data={education}
                      setData={setEducation}
                    />
                  </div>
                      <div className='inp'>
                        <Label className="font-semibold">School Name</Label>
                        <Input className="outline" value={education.name}  onChange={(e)=>{
                          setEducation(
                            {
                              ...education,
                              name:e.target.value
                            }
                          )
                        }}/>
                      </div>
                      <div className='inp'>
                        <Label className="font-semibold">Stream</Label>
                        <SelectBox 
                          text={"Select a board"}
                          values={(education.qualification.includes("th"))?boards:Course}
                          type={"stream"}
                          data={education}
                          setData={setEducation}
                        />
                      </div>
                      {(!education.qualification.includes("th")) &&
                        <div className='inp'>
                          <Label className="font-semibold">Specialization</Label>
                          <SelectBox
                            text={'Select a Specialization'}
                            values={specialization}
                            type={"specialization"}
                            data={education}
                            setData={setEducation}
                          />
                        </div>
                      }
                      <div className='flex justify-between gap-9'>
                        <div className='inp flex-1'>
                          <Label className="font-semibold">Start Year</Label>
                          <SelectBox 
                            text={""} 
                            values={yrs}
                            type={"from"}
                            data={education}
                            setData={setEducation}
                          />
                        </div>
                        <div className='inp flex-1'>
                          <Label className="font-semibold">End Year</Label>
                          <SelectBox 
                            text={""} 
                            values={yrs}
                            type={"to"}
                            data={education}
                            setData={setEducation}
                          />
                        </div>
                      </div>
                      <div className='inp'>
                        <Label className="font-semibold">CGPA out of 10</Label>
                        <Input className="outline" value={education.cgpa} onChange={(e)=>{
                          setEducation({
                            ...education,
                            cgpa:e.target.value
                          })
                        }}/>
                      </div>
                      <div>
                        <DialogClose>
                          <Button onClick={async()=>{
                            await AddForm(education,"education");
                            await fetchData();
                            setEducation(
                              {
                                qualification:"",
                                name:"",
                                stream:"",
                                specialization:"",
                                from:"",
                                to:"",
                                cgpa:""
                              }
                            );
                          }}>Save</Button>
                        </DialogClose>
                      </div>
                </div>
              </DialogContent>
            </Dialog>
        </div>
        {(user.education.length>0) &&
            <div className='py-3 mt-2 flex flex-col-reverse gap-1.5'>
            {(user.education).map((edu)=>{
              return(
                <div className='p-2'>
                  <div className='font-semibold'>{(edu.qualification.includes("th"))? edu.qualification : 
                        <div>{edu.stream} from {edu.name}</div>
                    }</div>
                  <div>
                    <div>{(edu.qualification.includes("th"))?edu.stream:""} </div>
                    <div>{((edu.to)<=(new Date().getFullYear())) ? `Passed out in ${edu.to}, With ${(edu.cgpa)*9.5}%` :`Passing in ${edu.to}, Till Now ${(edu.cgpa)}`}</div>
                  </div>
                </div>
              )
            })}
        </div>
        }
    </div>
  )
}

export default Education