import React, { useState, useEffect } from "react";
import RadioOption from "./RadioOption";
import NextButton from "./NextButton";
import { useAccountCreation } from "../accountContext";
import StateDropdown from "./Dropdopdown";
import next from "next";

const Location = ({ question, radioOptions, stepData }) => {
  const { currentSetupStep, data, errors, nextStep, prevStep, updateData } =
    useAccountCreation();

  const [userLocation, setUserLocation] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Use effect to handle the navigation after data update
  useEffect(() => {
    if (isUpdating && data.location === "manual") {
      setIsUpdating(false);
      nextStep();
    }
  }, [data.location, isUpdating, nextStep]);

  const handleLocation =  () => {
    setIsUpdating(true);
     updateData("location", "manual");
  };

  const MapComponent = (props) => {
    return (
      <div>
        <h1>Map Component</h1>
      </div>
    );
  };

  if (userLocation) {
    return <MapComponent />;
  }

  return (
    <div>
      {currentSetupStep !== "LANGUAGE" && (
        <button className="bg-white w-[5rem] rounded-2xl" onClick={prevStep}>
          <div className="text-[2rem]">&#8592;</div>
        </button>
      )}
      <div>
        {currentSetupStep.toLowerCase() !== stepData && (
          <button className="bg-white w-[5rem] rounded-2xl" onClick={prevStep}>
            <div className="text-[2rem]">&#8592;</div>
          </button>
        )}
        <div className="h-[10vh] below-445:h-[8vh] below-445:mt-4 mb-8 below-700:mb-1">
          <h1 className="text-white text-[3rem] below-700:text-[2rem] below-445:text-[1.5rem] below-321:text-[1.2rem] ">{question}</h1>
        </div>
        <div className="bg-white  w-full h-[70vh] below-321:w-[85vw] rounded-2xl flex flex-col justify-around items-center">
          <div>
            <button onClick={handleLocation}>
              <div className="w-[20rem] below-445:w-[15rem]  below-321:h-[3rem] flex bg-[#e5e1de] border-2 rounded-xl relative h-[4rem] px-4 border-gray-300">
                <div className="">
                  <p className="text-[0.8rem] left-0 relative top-1">State</p>
                  <h1 className="below-445:text-[0.9rem]  below-321:text-[0.7rem]">Select State</h1>
                </div>
              </div>
            </button>

            <div className="flex items-center justify-center">
              <div className="border-t w-[8rem] below-445:w-[4rem] border-gray-300 my-4" />
              <div className="px-3 self-center">OR</div>
              <div className="border-t w-[8rem] below-445:w-[4rem] border-gray-300 my-4" />
            </div>
            <div className=" ">
              <button
                className="flex bg-[#e5e1de] w-[20rem] below-321:h-[3rem] below-445:w-[15rem] h-[4rem] items-center px-7 rounded-2xl"
                onClick={handleLocation}
              >
                <img src="vector.png" className="w-[1.5rem] h-[1.5rem] " alt="" />
                <h1 className="ml-3 below-445:text-[0.8rem]  below-321:text-[0.7rem]">Use Current Location</h1>
              </button>
            </div>
          </div>

          {errors?.language && <p className="text-red-500">{errors?.language}</p>}

          <div>{/* <NextButton /> */}</div>
        </div>
      </div>
    </div>
  );
};

export default Location;