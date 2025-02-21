import React from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'

const LogoDesc = ({onHandleInputChange,formData}) => {
  return (
    <div className='my-10'>
      <HeadingDescription title={Lookup.LogoDescTitle} description={Lookup.LogoDescDesc}/>
       <input onChange={(e)=>onHandleInputChange(e.target.value)} value={formData?.desc}
          className='p-4 border rounded-lg mt-5 w-full' type='text' placeholder={Lookup.InputTitlePlaceHolder}/>
    </div>
  )
}

export default LogoDesc
