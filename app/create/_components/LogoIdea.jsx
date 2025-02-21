import React, { useEffect, useState } from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'
import Promt from '@/app/_data/Promt'
import axios from 'axios'
import { Loader2Icon } from 'lucide-react'


const LogoIdea = ({onHandleInputChange,formData}) => {
    const [ideas,setIdeas] = useState()
    const [loading,setLoading] = useState(true);
    const [selectedOp,setSelectedOp] = useState(formData?.idea);
    useEffect(()=>{
        generateLogoDesignIdea();
    },[])
    const generateLogoDesignIdea = async() => {
        setLoading(true);
        const PROMPT = Promt.DESIGN_IDEA_PROMPT
        .replace('{logoType}', formData?.design.title)
        .replace('{logoTitle}', formData.title)
        .replace('{logoDesc}', formData.desc)
        .replace('{logoPrompt}', formData.design.prompt);

    console.log(PROMPT);
        const result = await axios.post("api/ai-design-idea",{
            prompt:PROMPT
        })
        console.log(result.data);
        setIdeas(result.data.ideas);
        setLoading(false);
    }
    
  return (
    <div className='my-10'>
      <HeadingDescription title={Lookup.LogoIdeaTitle} description={Lookup.LogoIdeaDesc}/>


      <div className='flex items-center justify-center'>
        {loading && <Loader2Icon className='animate-spin my-10' />}
    </div>

      <div className='mt-10 flex flex-wrap gap-3'>

      {ideas && ideas.map((item,index)=>(
        <h2 onClick={()=>{setSelectedOp(item);onHandleInputChange(item)}} key={index} className={`p-2 rounded-full border px-3 cursor-pointer hover:border-blue-600 ${selectedOp == item ? "bg-blue-300" : ""}`}>
            {item}
        </h2>
      ))}
      <h2 onClick={()=>{setSelectedOp("Let AI select the best idea");onHandleInputChange("Let AI select the best idea")}} className={`p-2 rounded-full border px-3 cursor-pointer hover:border-blue-600 ${selectedOp == "Let AI select the best idea" ? "bg-blue-300" : ""}`}>Let AI select the best idea</h2>

      </div>
    </div>
  )
}

export default LogoIdea
