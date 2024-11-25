import React, { useState, useEffect } from "react";
import CustomSpinner from "../Spinner/CustomSpinner";

const Success2 = () => {
  const [currentStep, setCurrentStep] = useState(0); 

  useEffect(() => {
    if (currentStep < 3) { 
      const timer = setTimeout(() => {
        setCurrentStep((prevStep) => prevStep + 1); 
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  
  const items = [
    "Find the benefits that are right for you and your business",
    "Learn everything you need to apply",
    "Save Schemes and track your booking",
  ];

  return (
    <div className="bg-[#4f285e] h-screen w-[50vw] py-12">
      <div className="text-white text-center">
        <h1 className="leading-none text-[6rem]">हकदर्शक</h1>
        <h1 className="leading-none text-[4rem]">Haqdarshaq</h1>
      </div>

      <div className="mt-[8rem] pl-[10rem]">
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
              <h1>{item}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Success2;
