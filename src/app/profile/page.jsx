"use client"
import { getSession } from '@/actions/Session';
import { ProfileSetUp } from '@/actions/Setup';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { MdOutlineMail } from "react-icons/md";
import { MdOutlineLocalPhone } from "react-icons/md";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IoLocationOutline } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { genders, indianStatesAndUTs } from '@/constant/values';
import { PersonalData } from '@/actions/PersonalData';
import Education from '@/components/Education';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import WorkExperience from '@/components/WorkExperience';
import Certification from '@/components/Certification';
import SocialLink from '@/components/SocialLink';
import Summary from '@/components/Summary';


const Page = () => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState({});
  const [loading, setLoading] = useState(false);


  const [name, setName] = useState();
  const [number, setNumber] = useState("");
  const [date, setDate] = useState();
  const [gender, setGender] = useState("");
  const [position,setPosition] = useState("");
  const [url,setUrl] = useState("");

  const state = useRef();

  const fetchData = async () => {
    try {
      const value = await ProfileSetUp();
      setName(value.name)
      setUser(value);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const userInfo = await getSession();
        setSession(userInfo.user);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };
    const fetchDataAsync = async () => {
      setLoading(true);
      await fetchSession();
      await fetchData();
      setLoading(false);
    };

    fetchDataAsync();
  }, []);


  function handleChange ({name,DOB,number,gender,location}){
    const UpdateData = async ()=>{
      await PersonalData({name,DOB,number,gender,location,position,url})
      await fetchData();
    }
    UpdateData();
  }


  if (loading) {
    return <div className='w-full h-full flex items-center justify-center text-[45px]'>Loading...</div>;
  }

  return (
    <div className='bg-[#f1f1f1] max-h-full'>
      <div className='py-11'>
        {session?.image && (
          <div className='relative profile w-3/4 h-[310px] rounded-[10px] bg-white m-auto bg-ed-100 overflow-hidden flex drop-shadow-xl py-1 items-center justify-center px-16 gap-8'>
            <div className=''>
              <Image src={session.image} height={180} width={180} alt='google' className='rounded-full' />
            </div>
            <div className='flex-1'>
              <div className='text-2xl font-sans font-semibold'>{user.name.toUpperCase()}</div>
                <div className='text-gray-500 font-semibold text-[16px]'>
                  {user.role}
                </div>
              <div className='w-full h-[2px] mt-4 bg-gray-500 rounded-md'></div>
              <div className='w-full px-14 py-3 flex justify-between h-full'>
                <div className='flex flex-col gap-2'>
                  <div className='info'>
                    <Image src={"/icons/gen.svg"} width={20} height={20} alt='no' />
                    <div>{user.gender}</div>
                  </div>
                  <div className='info'>
                    <LiaBirthdayCakeSolid size={20}/>
                    <div>{user.DOB}</div>
                  </div>
                  <div className='info'>
                    <IoLocationOutline size={20}/>
                    <div>{user.location}</div>
                  </div>
                </div>
                <div className='flex flex-col gap-2'>
                  <div className='info'><MdOutlineMail size={20}/> {user.email}</div>
                  <div className='info'><MdOutlineLocalPhone size={20}/> {user.number}</div>
                </div>
              </div>
            </div>
            <Dialog>
              <DialogTrigger>
                <Button className="absolute bottom-0 right-0 px-7">
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Profile Details</DialogTitle>
                  <DialogDescription>
                    <div className='mt-5 text-black font-semibold flex flex-col gap-7'>
                      <div className='flex flex-col gap-3'>
                        <Label>Full Name:</Label>
                        <Input value={name} className="outline" onChange={(e)=>{
                          setName(e.target.value);
                        }}/>
                      </div>
                      <div className='flex flex-col gap-3'>
                        <Label>Gender:</Label>
                        <div className='flex gap-2'>
                          {genders.map((gens) => {
                            return (
                              <div className={`px-6 rounded-[10px] py-3 border-2 border-black ${(gender.includes(gens) ? "bg-gray-400" : "")}`} onClick={() => {
                                setGender(gens)
                              }}>{gens}</div>
                            )
                          })}
                        </div>
                      </div>
                      <div className='flex flex-col gap-3'>
                        <Label>Phone Number:</Label>
                        <Input className="outline" value={number} onChange={(e)=>{
                          setNumber(e.target.value);
                        }}/>
                      </div>
                      <div>
                        <Popover>
                          <PopoverTrigger className='flex flex-col gap-3'>
                            <Label>Date of Birth:</Label>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[280px] justify-start text-left font-normal outline",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : <span>Date of Birth</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className='flex flex-col gap-3'>
                        <Label>Current Position</Label>
                        <Input placeholder="i.e Student"  className="outline" value={position} onChange={(e)=>
                          {
                            setPosition(e.target.value)
                          }
                        }/>
                      </div>
                      <div className='flex flex-col gap-3'>
                        <Label>State:</Label>
                        <Select >
                          <SelectTrigger className="w-[180px] outline">
                            <SelectValue placeholder="State:"  ref={state}/>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {(indianStatesAndUTs).map((state)=>{
                                return(
                                  <SelectItem value={state}>{state}</SelectItem>
                                )
                              })}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Button onClick={()=>{
                          const location = state.current.innerText;
                          const DOB = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(date)
                          handleChange({name,DOB,number,gender,location})
                        }}>Save</Button>
                      </div>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
      <div className='w-2/3 m-auto py-8'>
        {(user && !loading) &&
            <div className='flex flex-col gap-8'>
              <Summary 
                user={user}
                fetchData={fetchData}
              />
              <Education 
                user={user}
                fetchData={fetchData}
              />
              <Skills
                user={user}
                fetchData={fetchData}
              />
              <Projects 
                user={user}
                fetchData={fetchData}
              />
              <WorkExperience 
                user={user}
                fetchData={fetchData}
              />
              <Certification 
                user={user}
                fetchData={fetchData}
              />
              <SocialLink 
                user={user}
                fetchData={fetchData}
              />
            </div>
        }
      </div>
    </div>
  );
}

export default Page;