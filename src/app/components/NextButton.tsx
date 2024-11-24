import React, { use, useEffect } from 'react'
import { useAccountCreation } from '../accountContext';

const NextButton = () => {
    const { currentSetupStep, data, errors, nextStep, prevStep, updateData } =
    useAccountCreation();

    useEffect(() => {
      alert("Selected language: " + data?.language);
      console.log("this is the errors",errors);
      }, [errors]);
      
  return (
    <button onClick={nextStep}
    disabled={data?.language === ""}
    className={' bg-[#4f285e] w-[20rem] h-[4rem] rounded-2xl flex items-center justify-center '}>
      <h1 className=' text-white' >Next</h1>
    </button>
  )
}

export default NextButton
