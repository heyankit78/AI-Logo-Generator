"use client"
import React, { useState } from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'
import { useSearchParams } from 'next/navigation'

const LogoTitle = ({onHandleInputChange,formData}) => {
    const searchParams = useSearchParams(formData?.title);
    const [title,setTitle] = useState(searchParams?.get('title') ?? "")
  return (
    <>
    <div className='my-10'>
        <HeadingDescription title={Lookup.LogoTitle} description={Lookup.LogoTitleDesc}/>
    </div>
    <input onChange={(e)=>onHandleInputChange(e.target.value)} defaultValue={searchParams?.get('title')}
    className='p-4 border rounded-lg mt-5 w-full' type='text' placeholder={Lookup.InputTitlePlaceHolder}/>
    </>
  )
}

export default LogoTitle
