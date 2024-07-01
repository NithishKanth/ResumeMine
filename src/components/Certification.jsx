"use client"
import React, { useState } from 'react'
import { IoMdLink } from "react-icons/io";
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
import { AddForm } from '@/actions/AddForm';
import Link from 'next/link';
const Certification = ({user,fetchData}) => {

    const [certificate,setCertificate] = useState({
        name:"",
        from:"",
        id:"",
        url:""
    })
  return (
    <div className='bg-white py-7 px-8 rounded-xl drop-shadow-lg'>
        <div className='text-[18px] font-semibold flex items-center justify-between'>
            <div>Certification</div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Add</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[650px]">
                    <DialogHeader className={'font-semibold text-xl mb-3'}>
                        Certification
                        <DialogDescription>
                        Add details of your certification.
                        </DialogDescription>
                    </DialogHeader>
                    <div className='flex flex-col gap-6'>
                        <div className='inp'>
                            <Label>Certification name</Label>
                            <Input className="outline" placeholder="Enter the Certification Name" value={certificate.name} onChange={(e)=>{
                                setCertificate({
                                    ...certificate,
                                    name:e.target.value
                                })
                            }}/>
                        </div>
                        <div className='inp'>
                            <Label>Certification completion ID</Label>
                            <Input className="outline" placeholder="Enter the Certification ID" value={certificate.id} onChange={(e)=>{
                                setCertificate({
                                    ...certificate,
                                    id:e.target.value
                                })
                            }}/>
                        </div>
                        <div className='inp'>
                            <Label>Certification From</Label>
                            <Input className="outline" placeholder="Enter the Certification ID" value={certificate.from} onChange={(e)=>{
                                setCertificate({
                                    ...certificate,
                                    from:e.target.value
                                })
                            }}/>
                        </div>
                        <div className='inp'>
                            <Label>Certification completion Url</Label>
                            <Input className="outline" placeholder="Enter the Certification Url" value={certificate.url} onChange={(e)=>{
                                setCertificate({
                                    ...certificate,
                                    url:e.target.value
                                })
                            }}/>
                        </div>
                        <div className='mt-3'>
                            <DialogClose>
                                <Button onClick={async()=>{
                                    await AddForm(certificate,"certificates")
                                    await fetchData()
                                }}>Add</Button>
                            </DialogClose>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
        {(user.certificates.length>0) &&
            <div className='py-3 mt-2 flex gap-2 items-center flex-wrap'>
            {(user.certificates).map((cer)=>{
              return(
                <div className=''>
                    <div className='font-semibold text-lg flex items-center gap-2'>{cer.name} 
                        <Link href={cer.url}><IoMdLink size={27}/></Link>
                    </div>
                    <div className='flex items-center gap-2'>
                        <span className='font-semibold'>Provider:</span>
                        <div>{cer.from}</div>
                    </div>
                </div>
              )
            })}
        </div>
        }
    </div>
  )
}

export default Certification