import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
const SelectBox = ({text,values,type,data,setData}) => {
  return (
    <Select onValueChange={(e)=>{
        setData({
            ...data,
            [type] : e
        })
    }}>
        <SelectTrigger className='outline'>
            <SelectValue placeholder={text}/>
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                {(values).map((val)=>{
                    return(
                        <SelectItem value={val}>
                            {val}
                        </SelectItem>
                    )
                })}
            </SelectGroup>
        </SelectContent>
    </Select>
  )
}

export default SelectBox