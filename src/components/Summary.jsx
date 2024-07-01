"use client"
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Label } from './ui/label'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogDescription,
    DialogHeader,
    DialogClose,
}
from './ui/dialog';
import { Textarea } from './ui/textarea';
import { AddForm } from '@/actions/AddForm';
import { AddSingle } from '@/actions/AddSingle';


const Summary = ({user,fetchData}) => {
    const [summary ,setSummary] = useState("");
  return (
    <div className='bg-white py-7 px-8 rounded-xl drop-shadow-lg'>
        <div className='text-[18px] font-semibold flex items-center justify-between'>
        <div>Education</div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Edit</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[650px]">
            <DialogHeader className={'font-semibold text-xl mb-9'}>
              Add Summary
              <DialogDescription>
            Adding your Summary (short note about work and skills)
            </DialogDescription>
            </DialogHeader>
            <div>
                <div className='inp'>
                    <Label>Summary</Label>
                    <Textarea className="outline" value={summary}  onChange={(e)=>{
                        setSummary(e.target.value)
                    }} />
                </div>
                <Button className="mt-5" onClick={async()=>{
                    await AddSingle(summary,'summary')
                    await fetchData()
                }}>Save</Button>
            </div>
            </DialogContent>
            </Dialog>
        </div>
        {(user.summary) &&
            <div className='p-3'>
                {user.summary}
            </div>
        }
    </div>
  )
}

export default Summary