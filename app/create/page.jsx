"use client"
import React, { useState } from 'react'
import LogoTitle from './_components/LogoTitle'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import LogoDesc from './_components/LogoDesc'
import LogoColorPallete from './_components/LogoColorPallete'
import LogoDesign from './_components/LogoDesign'
import LogoIdea from './_components/LogoIdea'
import PricingModal from './_components/PricingModal'

const page = () => {
    const [step,setStep] = useState(1);
    const [formData,setFormData] = useState();

    const onHandleInputChange = (field,value) => {
        setFormData(prev=>({
            ...prev,
            [field]:value
        }))
    }

    console.log("formdata--",formData)
// const 
  return (

    <div className='mt-28 p-10 border rounded 2xl:mx-72'>
      
        {step == 1 ? <LogoTitle formData={formData} onHandleInputChange={(e)=>onHandleInputChange('title',e)}/> : 
        step == 2 ? <LogoDesc formData={formData} onHandleInputChange={(e)=>onHandleInputChange('desc',e)}/> 
        : step == 3 ? <LogoColorPallete formData={formData} onHandleInputChange={(e)=>onHandleInputChange('pallete',e)}/> : 
        step == 4 ? <LogoDesign formData={formData} onHandleInputChange={(e)=>onHandleInputChange('design',e)}/> :
         step == 5 ? <LogoIdea formData={formData} onHandleInputChange={(e)=>onHandleInputChange('idea',e)}/> :
         step == 6 ? <PricingModal formData={formData} onHandleInputChange={(e)=>onHandleInputChange('pricing',e)}/>
          : null}
      
      <div className='flex items-center justify-between mt-10'>
        {step != 1 && <Button onClick={()=>setStep(step-1)} variant="outline"><ArrowLeft/>Previous</Button>}
        <Button onClick={()=>setStep(step+1)}><ArrowRight/>Continue</Button>
      </div>
    </div>
  )
}

export default page
