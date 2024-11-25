import React from 'react'
import { useAccountCreation } from '../accountContext';

const RadioOption = ({text,value,stepData}) => {

    const { currentSetupStep, data, errors, nextStep, prevStep, updateData } =
    useAccountCreation();

    const handleChange = (e) => {   
      // alert('clicked') 
      console.log('this is the stepData',stepData)
      console.log('this is the stepData and value',stepData,value)
        updateData(stepData, value); // Update the selected language
      };
  return (
    <div className=' w-[20rem] my-4'>
      <div className=' bg-[#e5e1de] border-2 rounded-xl flex h-[4rem] px-4 border-gray-300'>
      <input type="radio" id="html" name="fav_language"  style={{ accentColor: '#4f285e' }} value={value}
                checked={data[stepData] === value} // Ensure it reflects the current selected language

        onChange={handleChange}/>

    <h1 className=' pl-2 items-center 500 self-center '>{text}</h1>
      </div>
     
    </div>
  )
}

export default RadioOption
