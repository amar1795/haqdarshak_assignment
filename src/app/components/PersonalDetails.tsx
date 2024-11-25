import React from "react";
import RadioOption from "./RadioOption";
import NextButton from "./NextButton";
import { useAccountCreation } from "../accountContext";
import StateDropdown from "./Dropdopdown";

const PersonalDetails = ({ question, radioOptions, stepData }) => {
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
              <div className="  mt-2">
                <h1 className=" ml-2">Name</h1>
                <div className=" w-[25rem] mt-2 bg-[#e5e1de] border-2 rounded-xl relative  h-[4rem] px-4 border-gray-300">
                  <p className=" text-[0.8rem]  relative top-1">Full Name</p>
                  {/* <StateDropdown stepData={stepData} /> */}
                  <input
                    type="text"
                    className="bg-[#e5e1de] outline-none h-[2rem]"
                    placeholder="Enter your full Name"
                  />
                </div>
              </div>
            </div>
            <div className="border-t border-gray-300 my-4" />

            <div>
              <div className="  mt-4">
                <h1 className="">Gender</h1>
                <div className=" flex justify-around mt-2">
                  <div className=" flex items-center">
                    <input
                      type="radio"
                      id="html"
                      name="fav_language"
                      style={{ accentColor: "#4f285e" }}
                    />
                    <h1 className=" ml-2">Male</h1>
                  </div>
                  <div className=" flex items-center">
                    <input
                      type="radio"
                      id="html"
                      name="fav_language"
                      style={{ accentColor: "#4f285e" }}
                    />
                    <h1 className=" ml-2">Female</h1>
                  </div>
                  <div className=" flex items-center">
                    <input
                      type="radio"
                      id="html"
                      name="fav_language"
                      style={{ accentColor: "#4f285e" }}
                    />
                    <h1 className=" ml-2">Others</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-300 my-4" />

            <div className=" mt-5">
              <h1>DOB/Age</h1>
              <div className=" flex mt-2">
                <div className="  w-[17rem] mt-1 bg-[#e5e1de] border-2 rounded-xl relative  h-[4rem] px-4 border-gray-300">
                  {/* <StateDropdown stepData={stepData} /> */}
                  <p className=" text-[0.8rem]  relative top-1">Date of birth</p>

                  <input
                    type="text"
                    className="bg-[#e5e1de] outline-none h-[2rem]  "
                    placeholder="Enter your full Name"
                  />
                </div>
                <div className=" self-center px-3">OR</div>
                <div className=" w-[5rem]  flex items-center mt-1 bg-[#e5e1de] border-2 rounded-xl relative  h-[4rem] px-4 border-gray-300">
                  {/* <StateDropdown stepData={stepData} /> */}
                  <input
                    type="text"
                    className="bg-[#e5e1de] outline-none h-[2rem] w-[2rem]"
                    placeholder="Age"
                  />
                </div>
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

export default PersonalDetails;
