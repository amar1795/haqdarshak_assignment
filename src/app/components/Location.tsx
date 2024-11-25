import React, { useState } from "react";
import RadioOption from "./RadioOption";
import NextButton from "./NextButton";
import { useAccountCreation } from "../accountContext";
import StateDropdown from "./Dropdopdown";

const Location = ({ question, radioOptions, stepData }) => {
  const { currentSetupStep, data, errors, nextStep, prevStep, updateData } =
    useAccountCreation();

    const [userLocation, setUserLocation] = useState(false);
  // console.log("this is the current step", currentSetupStep,stepData);

  const handleLocation = () => {
    updateData("location", "manual");
    nextStep();
  }


  const MapComponent=(props)=>{
    return(
      <div>
        <h1>Map Component</h1>
      </div>
    )
  }

  if(userLocation){
    return <MapComponent/>
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
        <div className=" h-[10vh] mb-8 ">
          <h1 className=" text-white text-[3rem]"> {question}</h1>
        </div>
        <div className=" bg-white w-full h-[70vh] rounded-2xl  flex flex-col justify-around items-center ">
          {/* <Radiobox/> */}
          <div>
          <div>
          <button onClick={handleLocation}>
            <div className=' w-[20rem] flex bg-[#e5e1de] border-2 rounded-xl relative  h-[4rem] px-4 border-gray-300'>
             <div className="">
             <p className=" text-[0.8rem] left-0 relative top-1">State</p>
             <h1>Select State</h1>
             </div>
            </div>
            </button>
          </div>
          <div className=" flex items-center justify-center">
          <div className="border-t w-[8rem] border-gray-300 my-4" />

          <div className=" px-3 self-center">OR</div>
          <div className="border-t w-[8rem] border-gray-300 my-4" />

          </div>
          <div>
            <button className=" flex bg-[#e5e1de] w-[20rem] h-[4rem] items-center px-7 rounded-2xl" onClick={()=>setUserLocation(true)} >
              <img src="vector.png" className=" w-[1.5rem] h-[1.5rem]" alt="" />
              <h1 className=" ml-3">Use Current Location</h1>
            </button>
          </div>
          </div>
          
          {errors?.language && (
            <p className="text-red-500">{errors?.language}</p>
          )}

          <div>
            {/* <NextButton /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
