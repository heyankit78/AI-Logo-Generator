import React, { useState } from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'
import Colors from '@/app/_data/Colors'

const LogoColorPallete = ({onHandleInputChange,formData}) => {
    const [selectedOp,setSelectedOp] = useState(formData?.pallete)
  return (
    <div className='my-10'>
      <HeadingDescription description={Lookup.LogoColorPaletteDesc} title={Lookup.LogoColorPaletteTitle}/>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-5'>
        {Colors.map((pallete,index)=>(
            <div key={index} className={`flex p-1 cursor-pointer ${selectedOp == pallete.name && 'border rounded-lg border-blue-800'}`}>
                {pallete?.colors.map((color,index)=>(
                    <div onClick={()=>{setSelectedOp(pallete.name);onHandleInputChange(pallete.name)}} className='h-24 w-full' key={index} style={{backgroundColor:color}}>

                    </div>
                ))}
            </div>
        ))}
      </div>
    </div>
  )
}

export default LogoColorPallete
