import React from 'react'
import RadioOption from './RadioOption'
import NextButton from './NextButton'
import { useAccountCreation } from '../accountContext';

const MainComponent = ({ question, radioOptions }) => {
  const { currentSetupStep, data, errors, nextStep, prevStep, updateData } =
    useAccountCreation();
    
  return (
    <div>
       <div >
          <div className=" h-[10vh] mb-8 ">
            <h1 className=" text-white text-[3rem]">
              {" "}
             {question}
            </h1>
          </div>
          <div className=" bg-white w-full h-[70vh] rounded-2xl  flex flex-col justify-around items-center ">
            {/* <Radiobox/> */}
            <div>
            {radioOptions.map((option, index) => (
              <RadioOption
                key={index}
                text={option.text}
                value={option.value}
              />
            ))}
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
