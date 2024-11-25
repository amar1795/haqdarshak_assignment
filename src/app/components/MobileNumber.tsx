import React from "react";
import RadioOption from "./RadioOption";
import NextButton from "./NextButton";
import { useAccountCreation } from "../accountContext";

const MobileNumber = ({ question, radioOptions, stepData }) => {
  const { currentSetupStep, data, errors, nextStep, prevStep, updateData } =
    useAccountCreation();


  return (
    <div>
      <div>
        <div className=" h-[15vh] mb-8 ">
        {currentSetupStep.toLowerCase() !== stepData && (
          <button
            className=" bg-white  w-[5rem] rounded-2xl"
            onClick={prevStep}
          >
            <div className=" text-[2rem]">&#8592;</div>
          </button>
        )}
          <h1 className=" text-white text-[3rem]  pb-[5rem]"> {question}</h1>
        </div>
        <div className=" bg-white w-full h-[60vh] rounded-2xl  flex flex-col justify-around items-center ">
          {/* <Radiobox/> */}
          <div className=" w-[20rem] my-4">
            <div className=" bg-[#e5e1de] border-2 rounded-xl flex h-[4rem] px-4 border-gray-300">
              <div className=" pt-2">
                <p className=" text-[0.8rem]">Mobile number</p>
                <input
                  type="number"
                  id="html"
                  name="fav_language"
                  onChange={(e) => updateData("phoneNumber", e.target.value)}
                  className="bg-[#e5e1de] outline-none text-[#4f285e]"
                  style={{ accentColor: "#4f285e" }}
                />
              </div>
            </div>
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

export default MobileNumber;