"use client"

import React, { useState } from 'react'
import { Textarea } from './ui/textarea';
import { AddSingle } from '@/actions/AddSingle';

const BoxSummary = ({info,fetchData}) => {
    const [summary,setSummary] = useState(info.summary);
    const handleChange = async(e) => {
        const { value } = e.target;
        setSummary(value);
        await AddSingle(value,"summary");
        await fetchData();
    };
  return (
    <div className='p-8 paper rounded-[9px]'>
        <div className='text-xl font-semibold mb-5'>Profile Summary</div>
        <Textarea value={summary} className="resize-none h-fit outline" onChange={handleChange}/>
    </div>
  )
}

export default BoxSummary