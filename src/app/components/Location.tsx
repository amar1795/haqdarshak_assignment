import React from "react";
import RadioOption from "./RadioOption";
import NextButton from "./NextButton";
import { useAccountCreation } from "../accountContext";
import StateDropdown from "./Dropdopdown";

const Location = ({ question, radioOptions, stepData }) => {
  const { currentSetupStep, data, errors, nextStep, prevStep, updateData } =
    useAccountCreation();
  // console.log("this is the current step", currentSetupStep,stepData);
  return (
    <div>
      <div>
        {currentSetupStep.toLowerCase() !== stepData && (
          <button
            className=" bg-white  w-[5rem] rounded-2xl"
            onClick={prevStep}
          >
            <div className=" text-[2rem]">&#8592;</div>
          </button>
        )}
        <div className=" h-[10vh] mb-8 ">
          <h1 className=" text-white text-[3rem]"> {question}</h1>
        </div>
        <div className=" bg-white w-full h-[70vh] rounded-2xl  flex flex-col justify-around items-center ">
          {/* <Radiobox/> */}
          <div>
          <div>
            Select State
          </div>
          <span>or</span>
          <div>
            Current location
          </div>
          </div>
          <div className=' w-[20rem] bg-[#e5e1de] border-2 rounded-xl absolute  h-[4rem] px-4 border-gray-300'>
              <p className=" text-[0.8rem]  relative top-1">State</p>
            <StateDropdown stepData={stepData}/>
            </div>
          {errors?.language && (
            <p className="text-red-500">{errors?.language}</p>
          )}

          <div>
            <NextButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
