import React from "react";
import RadioOption from "./RadioOption";
import NextButton from "./NextButton";
import { useAccountCreation } from "../accountContext";
import StateDropdown from "./Dropdopdown";

const MainComponent = ({ question, radioOptions, stepData }) => {
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
            {radioOptions.map((option, index) => (
              <RadioOption
                key={index}
                text={option.text}
                value={option.value}
                stepData={stepData}
              />
            ))}
           
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

export default MainComponent;
