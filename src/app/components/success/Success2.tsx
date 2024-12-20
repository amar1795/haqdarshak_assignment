import React, { useState, useEffect } from "react";
import CustomSpinner from "../Spinner/CustomSpinner";
import { useAccountCreation } from "@/app/accountContext";

const Success2 = () => {
  const [currentStep, setCurrentStep] = useState(0); 
    const {resetForm}=useAccountCreation();

  useEffect(() => {
    if (currentStep < 3) { 
      const timer = setTimeout(() => {
        setCurrentStep((prevStep) => prevStep + 1); 
      }, 1000);
      return () => clearTimeout(timer);
    }
    // resetForm();
  }, [currentStep]);

  
  const items = [
    "Find the benefits that are right for you and your business",
    "Learn everything you need to apply",
    "Save Schemes and track your booking",
  ];

  return (
    <div className="bg-[#4f285e] h-screen  w-full py-12 flex flex-col">
      <div className="text-white text-center">
        <h1 className="leading-none below-1000:text-[4rem]  text-[6rem]  ">हकदर्शक</h1>
        <h1 className="leading-none below-1000:text-[3rem] text-[4rem]   ">Haqdarshaq</h1>
      </div>

      <div className="mt-[8rem] pl-[10rem] below-1319:pl-[4rem] below-500:pl-[1rem]">
        {items.map((item, index) => (
          <div key={index} className="flex mb-7">
            <div className="left flex">
              {currentStep > index ? (
                <img src="/check.png" alt="Completed" className="w-6 h-6" />
              ) : (
                <CustomSpinner>Spinner</CustomSpinner>
              )}
            </div>
            <div className="right pl-[2rem] self-center text-white text-[1.2rem]">
              <h1 className="below-700:text-[0.8rem]">{item}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Success2;
