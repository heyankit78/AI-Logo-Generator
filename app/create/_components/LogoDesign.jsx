import React, { useState } from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'
import LogoDesign from '@/app/_data/LogoDesign'

const logoDesign = ({onHandleInputChange,formData}) => {
    const [selectedOp,setSelectedOp] = useState(formData?.design?.title)
  return (
    <div className='my-10'>
        <HeadingDescription description={Lookup.LogoDesignDesc} title={Lookup.LogoDesignTitle}/>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-10 mt-10'>
            {LogoDesign.map((design,index)=>(
                <div key={index} className={`flex p-1 cursor-pointer ${selectedOp == design.title && 'border rounded-lg border-blue-800'}`} onClick={()=>{setSelectedOp(design.title);onHandleInputChange(design)}}>
                <img className='w-full rounded-xl h-[150px] object-cover' src={design.image} width={300} height={200}></img>
                </div>
            ))}
        </div>
    </div>
  )
}

export default logoDesign
