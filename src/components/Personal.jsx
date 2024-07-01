"use client"
import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import SelectBox from './SelectBox';
import { indianStatesAndUTs } from '@/constant/values';
import { AddSingle } from '@/actions/AddSingle';

const Personal = ({ info, fetchData }) => {
    const [personal, setPersonal] = useState({
        name: info.name,
        email: info.email,
        city: info.city,
        state: info.location,
        number: info.number,
        role: info.role,
        gender: info.gender
    });

    const handleChange = async(e) => {
        const { name, value } = e.target;
        setPersonal({
            ...personal,
            [name]: value
        });
        await AddSingle(value,name);
        await fetchData();
    };
    return (
        <div className='p-8 paper rounded-[9px]'>
            <div className='text-xl font-semibold mb-5'>Personal Details</div>
            <div className='flex justify-between gap-5 mb-5'>
                <div className='inp flex-1'>
                    <Label>Name</Label>
                    <Input 
                        value={personal.name} 
                        className="outline font-semibold" 
                        placeholder="Enter your Full Name" 
                        name="name" 
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="flex gap-5 justify-between mb-5">
                <div className='inp flex-1'>
                    <Label>Mobile Number</Label>
                    <Input 
                        value={personal.number} 
                        className="outline" 
                        placeholder="Enter your mobile number" 
                        name="number" 
                        onChange={handleChange}
                    />
                </div>
                <div className='inp flex-1'>
                    <Label>Email</Label>
                    <Input 
                        value={personal.email} 
                        className="outline font-semibold" 
                    />
                </div>
            </div>
            <div className="flex gap-5 justify-between">
                <div className='inp flex-1'>
                    <Label>City</Label>
                    <Input 
                        value={personal.city} 
                        className="outline" 
                        placeholder="City" 
                        name="city" 
                        onChange={handleChange}
                    />
                </div>
                <div className='inp flex-1'>
                    <Label>State</Label>
                    <SelectBox 
                        values={indianStatesAndUTs} 
                        text={personal.state} 
                        type="state"
                        data={personal}
                        setData={setPersonal}
                    />
                </div>
            </div>
        </div>
    );
}

export default Personal;
