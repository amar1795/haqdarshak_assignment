import React, { use, useEffect } from 'react'
import { useAccountCreation } from '../accountContext';

const NextButton = ({stepData}) => {
    const { currentSetupStep, data, errors, nextStep, prevStep, updateData } =
    useAccountCreation();

    console.log("this is the current step data and stepdata", currentSetupStep,stepData,data);
    useEffect(() => {
      // alert("Selected language: " + data?.language);
      console.log("this is the errors",errors);
      }, [errors]);
      
  return (
<button 
  onClick={nextStep}
  disabled={!data?.[stepData]} // Check if the dynamic field in data is empty or undefined
  className={` bg-[#4f285e] w-[20rem] below-445:w-[15rem] below-321:w-[10rem] below-321:h-[3rem]  h-[4rem] rounded-2xl flex items-center justify-center ${
    !data?.[stepData] ? "opacity-50 cursor-not-allowed" : ""
  }`}>
  <h1 className=' text-white below-321:text-[0.8rem]'>Next</h1>
</button>
  )
}

export default NextButton
