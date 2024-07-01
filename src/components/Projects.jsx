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
import { months, yrs } from '@/constant/values';
import { Textarea } from './ui/textarea';
import { AddForm } from '@/actions/AddForm';

const Projects = ({user,fetchData}) => {

    const [project,setProject] = useState({
        name:"",
        startMonth:"",
        startYear:"",
        endMonth:"",
        endYear:"",
        desc:"",
        Url:""
    })
  return (
    <div className='bg-white py-7 px-8 rounded-xl drop-shadow-lg'>
        <div className='text-[18px] font-semibold flex items-center justify-between'>
            <div>Project Works</div>
            <Dialog>
            <DialogTrigger asChild>
                <Button>Add</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[650px]">
                <DialogHeader className={'font-semibold text-xl mb-3'}>
                    Project Details
                    <DialogDescription >
                        Give Your Project details 
                    </DialogDescription>
                </DialogHeader>
                <div className='flex flex-col gap-6'>
                    <div className='inp'>
                        <Label className="font-semibold">Project Title</Label>
                        <Input placeholder="Enter Project Title" className="outline" value={project.name} onChange={(e)=>{
                            setProject({
                                ...project,
                                name:e.target.value
                            })
                        }}/>
                    </div>
                    <div className='flex gap-5'>
                        <div className='inp flex-1'>
                            <Label>Start</Label>
                            <div className='flex gap-2'>
                                <SelectBox 
                                    text={"Month"}
                                    values={months}
                                    type={'startMonth'}
                                    data={project}
                                    setData={setProject}
                                />
                                <SelectBox 
                                    text={"Year"}
                                    values={yrs}
                                    type={'startYear'}
                                    data={project}
                                    setData={setProject}
                                />
                            </div>
                        </div>
                        <div className='inp flex-1'>
                            <Label>End</Label>
                            <div className='flex gap-2'>
                                <SelectBox 
                                    text={"Month"}
                                    values={months}
                                    type={'endMonth'}
                                    data={project}
                                    setData={setProject}
                                />
                                <SelectBox 
                                    text={"Year"}
                                    values={yrs}
                                    type={'endYear'}
                                    data={project}
                                    setData={setProject}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='inp'>
                        <Label>Project Description</Label>
                        <Textarea className="outline" value={project.desc} onChange={(e)=>{
                            setProject({
                                ...project,
                                desc:e.target.value
                            })
                        }}/>
                    </div>
                    <div className='inp'>
                        <Label>Project URL</Label>
                        <Input  className="outline" value={project.Url} onChange={(e)=>{
                            setProject({
                                ...project,
                                Url:e.target.value
                            })
                        }}/>
                    </div>
                    <div>
                        <DialogClose>
                            <Button className="mt-3 w-fit" onClick={async()=>{
                                await AddForm(project,'projects');
                                await fetchData();
                                setProject({
                                    name:"",
                                    startMonth:"",
                                    startYear:"",
                                    endMonth:"",
                                    endYear:"",
                                    desc:"",
                                    Url:""
                                })
                            }}>Save</Button>
                        </DialogClose>
                    </div>
                </div>
            </DialogContent>
            </Dialog>
        </div>
        {(user.projects.length>0) &&
            <div className='py-3 mt-2 flex gap-2 items-center flex-wrap'>
            {(user.projects).map((pro)=>{
              return(
                <div className=''>
                    <div className='font-semibold text-lg'>{pro.name}  ({pro.startMonth} {pro.startYear} - {pro.endMonth} {pro.endYear})</div>
                    <div className='text-gray-900'>{pro.desc}</div>
                </div>
              )
            })}
        </div>
        }
    </div>
  )
}

export default Projects