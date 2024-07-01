import React, { useState } from 'react'
import { Button } from './ui/button'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogDescription,
    DialogHeader,
}
from './ui/dialog';
import { Input } from './ui/input';
import { AddForm } from '@/actions/AddForm';

const Skills = ({user,fetchData}) => {

    const [skill,setSkill] = useState({
        name:"",
        type:"",
        level:""
    });
    const skillType = ['Hard Skills','Soft Skills'];
    const level = ["beginner", "intermediate", "advanced"]
  return (
    <div className='bg-white py-7 px-8 rounded-xl drop-shadow-lg'>
        <div className='text-[18px] font-semibold flex items-center justify-between'>
            <div>Key Skills</div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Add</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className={'font-semibold text-xl mb-5'}>
                    Add Skills
                  <DialogDescription>
                    Adding your Key Skills details help recruiters know your skills
                    </DialogDescription>
                </DialogHeader>
                <div className='flex flex-col gap-6'>
                    <Input className="outline" placeholder="Key Skills" value={skill.name} onChange={(e)=>{
                        setSkill({
                            ...skill,
                            name:e.target.value
                        })
                    }}/>
                    <div className='flex items-center gap-2'>
                        {(skillType).map((type)=>{
                            return(
                                <div className={`px-6 rounded-[10px] py-3 border-2 border-black cursor-pointer ${((skill.type).includes(type)) && 'bg-gray-400'}`} onClick={()=>{
                                    setSkill({
                                        ...skill,
                                        type:type
                                    })
                                }}>
                                    {type}
                                </div>
                            )
                        })}
                    </div>
                    <div className='flex items-center gap-2'>
                        {(level).map((lvl)=>{
                            return(
                                <div className={`px-6 rounded-[10px] py-3 border-2 border-black cursor-pointer ${((skill.level).includes(lvl)) && 'bg-gray-400'}`} onClick={()=>{
                                    setSkill({
                                        ...skill,
                                        level:lvl
                                    })
                                }}>
                                    {lvl}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <Button className="w-fit mt-6" onClick={async()=>{
                    await AddForm(skill,"skills")
                    setSkill({
                        name:"",
                        type:"",
                        level:""
                    })
                    await fetchData();
                }}>Add</Button>
              </DialogContent>
            </Dialog>
        </div>
        {(user.skills.length>0) &&
            <div className='py-3 mt-2 flex gap-2 items-center flex-wrap'>
            {(user.skills).map((skill)=>{
              return(
                <div className='border-[2px] border-black px-5 py-3 rounded-[10px] '>
                    {skill.name}
                </div>
              )
            })}
        </div>
        }
    </div>
  )
}

export default Skills