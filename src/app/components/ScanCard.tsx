import React, { useState } from "react";
import RadioOption from "./RadioOption";
import NextButton from "./NextButton";
import { useAccountCreation } from "../accountContext";
import StateDropdown from "./Dropdopdown";
import MobileNumber from "./MobileNumber";
import { stepsData } from "@/hook/useSetupSteps";

const ScanCard = ({ question, radioOptions, stepData }) => {
  const { currentSetupStep, data, errors, nextStep, prevStep, updateData } =
    useAccountCreation();

  const [usePhoneNumber, setUsePhoneNumber] = useState(false);
  // console.log("this is the current step", currentSetupStep,stepData);

  const handleScanCard = () => {
    updateData("otp", "scan_card");
    nextStep();
  };
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
        {currentSetupStep.toLowerCase() !== stepData && (
          <button
            className=" bg-white  w-[5rem] rounded-2xl"
            onClick={prevStep}
          >
            <div className=" text-[2rem]">&#8592;</div>
          </button>
        )}
        <div className=" h-[5vh]  ">
        </div>
        <div className=" bg-[#e5c7d6] w-[40vw] h-[75vh] rounded-2xl  flex flex-col justify-between items-center ">
          {/* top div */}

          <div className="  items-center flex flex-col  pt-[8rem]  h-[70%]">
          <h1 className=" text-[#4f285e] text-[1.2rem] ">Scan QR code from Yojana card to login</h1>
          <div className=" bg-white mt-8 h-[10rem] w-[10rem] border-4 border-pink-500 rounded-lg">
            <button onClick={handleScanCard}>
            <img src="bar.png" alt="" />
            </button>
           
          </div>

          {errors?.language && (
            <p className="text-red-500">{errors?.language}</p>
          )}
          </div>
         

        

    {/* bottom div */}

    <div className=" h-[20vh] bg-white w-full flex items-center justify-center rounded-2xl ">

   
          <div className=" ">
          <div className=" flex items-center justify-center">
          <div className="border-t w-[8rem] border-gray-300 my-4" />

          <div className=" px-3 self-center">OR</div>
          <div className="border-t w-[8rem] border-gray-300 my-4" />

          </div>
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
          </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanCard;
