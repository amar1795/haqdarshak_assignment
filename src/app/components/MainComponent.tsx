import React from 'react'
import RadioOption from './RadioOption'
import NextButton from './NextButton'
import { useAccountCreation } from '../accountContext';

const MainComponent = () => {
  const { currentSetupStep, data, errors, nextStep, prevStep, updateData } =
    useAccountCreation();
    
  return (
    <div>
       <div >
          <div className=" h-[10vh] mb-8 ">
            <h1 className=" text-white text-[3rem]">
              {" "}
              Which language would you prefer ?
            </h1>
          </div>
          <div className=" bg-white w-full h-[70vh] rounded-2xl  flex flex-col justify-around items-center ">
            {/* <Radiobox/> */}
            <div>
              <RadioOption text="English" value="english"  />
              <RadioOption text="हिन्दी"  value="हिन्दी"/>
              <RadioOption text="ಕನ್ನಡ" value="ಕನ್ನಡ" />
            </div>
            
            {errors?.language && <p className="text-red-500">{errors?.language}</p>}

            <div>
              <NextButton />
            </div>
          </div>
        </div>
    </div>
  )
}

export default MainComponent
