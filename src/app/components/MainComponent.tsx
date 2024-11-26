import React, { useState } from "react";
import RadioOption from "./RadioOption";
import NextButton from "./NextButton";
import { useAccountCreation } from "../accountContext";
import StateDropdown from "./Dropdopdown";
import MobileNumber from "./MobileNumber";
import { stepsData } from "@/hook/useSetupSteps";

const MainComponent = ({ question, radioOptions, stepData }) => {
  const { currentSetupStep, data, errors, nextStep, prevStep, updateData } =
    useAccountCreation();

  const [usePhoneNumber, setUsePhoneNumber] = useState(false);
  console.log("this is the current step", currentSetupStep);
  console.log("this is the current data", data);

  if (stepData == "otp" && usePhoneNumber) {
    return (
      <MobileNumber
        stepData={"phoneNumber"}
        question={stepsData.PHONE_NUMBER.question}
        radioOptions={stepsData.PHONE_NUMBER.options}
      />
    );
  }

  return (
    <div>
      <div>
        {currentSetupStep !== "LANGUAGE" && (
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

          {stepData == "otp" && (
            <button
              onClick={() => setUsePhoneNumber(true)}
              disabled={data?.language === ""}
              className={
                " bg-[#4f285e] w-[20rem] h-[4rem] rounded-2xl flex items-center justify-center "
              }
            >
              <h1 className=" text-white">Use Phone Number</h1>
            </button>
          )}

          <div>
            <NextButton  stepData={stepData}
 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
