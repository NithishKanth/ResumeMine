"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogDescription,
    DialogHeader,
    DialogClose,
}
from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import SelectBox from './SelectBox';
import { indianStatesAndUTs, months, yrs } from '@/constant/values';
import { Textarea } from './ui/textarea';
import { AddForm } from '@/actions/AddForm';
import { IoLocationOutline } from "react-icons/io5";


const WorkExperience = ({user,fetchData}) => {
    const [work,setWork] = useState({
        role:"",
        firmname:"",
        startMonth:"",
        startYear:"",
        endMonth:"",
        endYear:"",
        workdesc:"",
        city:"",
        state:"",
        link:""
    })
  return (
    <div className='bg-white py-7 px-8 rounded-xl drop-shadow-lg'>
        <div className='text-[18px] font-semibold flex items-center justify-between'>
            <div>Work Experience</div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Add</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[650px]">
                    <DialogHeader className={'font-semibold text-xl mb-3'}>
                        Work Experience
                        <DialogDescription >
                            Add your Experience to your resume
                        </DialogDescription>
                    </DialogHeader>
                    <div className='flex flex-col gap-6'>
                        <div className='inp'>
                            <Label className="font-semibold">Position Title</Label>
                            <Input placeholder="Enter the title" className="outline" value={work.role} onChange={(e)=>{
                                setWork({
                                    ...work,
                                    role:e.target.value
                                })
                            }}/>
                        </div>
                        <div className='inp'>
                            <Label className="font-semibold">Company Name</Label>
                            <Input placeholder="Enter the company name" className="outline" value={work.firmname} onChange={(e)=>{
                                setWork({
                                    ...work,
                                    firmname:e.target.value
                                })
                            }}/>
                        </div>
                        <div className='flex gap-5'>
                            <div className='inp flex-1'>
                                <Label className="font-semibold">Start</Label>
                                <div className='flex gap-2'>
                                    <SelectBox 
                                        text={"Month"}
                                        values={months}
                                        type={'startMonth'}
                                        data={work}
                                        setData={setWork}
                                    />
                                    <SelectBox 
                                        text={"Year"}
                                        values={yrs}
                                        type={'startYear'}
                                        data={work}
                                        setData={setWork}
                                    />
                                </div>
                            </div>
                            <div className='inp flex-1'>
                                <Label className="font-semibold">End</Label>
                                <div className='flex gap-2'>
                                    <SelectBox 
                                        text={"Month"}
                                        values={months}
                                        type={'endMonth'}
                                        data={work}
                                        setData={setWork}
                                    />
                                    <SelectBox 
                                        text={"Year"}
                                        values={yrs}
                                        type={'endYear'}
                                        data={work}
                                        setData={setWork}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-5'>
                            <div className='inp flex-1'>
                                <Label className="font-semibold">City</Label>
                                <Input placeholder="city" className="outline" value={work.city}  onChange={(e)=>{
                                    setWork({
                                        ...work,
                                        city:e.target.value
                                    })
                                }}/>
                            </div>
                            <div className='inp flex-1'>
                                <Label className="font-semibold">State</Label>
                                <SelectBox 
                                    text={""}
                                    values={indianStatesAndUTs}
                                    type={"state"}
                                    data={work}
                                    setData={setWork}
                                />
                            </div>
                        </div>
                        <div className='inp'>
                            <Label>Work Description</Label>
                            <Textarea className="outline" value={work.workdesc} onChange={(e)=>{
                                setWork({
                                    ...work,
                                    workdesc:e.target.value
                                })
                            }}/>
                        </div>
                        <div className='inp'>
                            <Label>Project Url</Label>
                            <Input className="outline" value={work.link} onChange={(e)=>{
                                setWork({
                                    ...work,
                                    link:e.target.value
                                })
                            }}/>
                        </div>
                        <div className='mt-2'>
                            <DialogClose>
                                <Button onClick={async()=>{
                                    await AddForm(work,'works');
                                    await fetchData();
                                    setWork({
                                        role:"",
                                        firmname:"",
                                        startMonth:"",
                                        startYear:"",
                                        endMonth:"",
                                        endYear:"",
                                        workdesc:"",
                                        city:"",
                                        state:"",
                                        link:""
                                    })
                                }}>Save</Button>
                            </DialogClose>
                        </div>
                    </div>
                    
                </DialogContent>
            </Dialog>
        </div>
        {(user.works.length>0) &&
            <div className='py-3 mt-2 flex flex-col gap-2'>
            {(user.works).map((work)=>{
              return(
                <div className='flex-1'>
                    <div className='font-semibold text-lg'>{work.role}  ({work.startMonth} {work.startYear} - {work.endMonth} {work.endYear})</div>
                    <div className='text-gray-900 font-medium'>For {work.firmname}</div>
                    <div className='flex items-center p-0'>
                        <IoLocationOutline /> {work.city}, {work.state}
                    </div>
                </div>
              )
            })}
        </div>
        }
    </div>
  )
}

export default WorkExperience