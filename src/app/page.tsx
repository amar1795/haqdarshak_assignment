"use client";
import { useEffect, useState } from "react";
import Radiobox from "./components/Radiobox";
import RadioOption from "./components/RadioOption";
import NextButton from "./components/NextButton";
import MainComponent from "./components/MainComponent";
import { useAccountCreation } from "./accountContext";
import RenderStep from "./components/RenderStep";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0); // Track the current slide
  const [isAnimating, setIsAnimating] = useState(false); // Track if the animation is ongoing
  const { currentSetupStep, data, errors, nextStep, prevStep, updateData } =
    useAccountCreation();

 

  useEffect(() => {
    if (currentStep < 2) {
      const timer = setTimeout(() => {
        setIsAnimating(true); 
        setTimeout(() => {
          setCurrentStep((prev) => prev + 1); 
          setIsAnimating(false); 
        }, 500); 
      }, 1000); 
      return () => clearTimeout(timer);
    }
  }, [currentStep,nextStep]);

  const slides = [
    {
      content: (
        <div className="text-white text-[5rem] text-center below-500:text-[3rem]">
          <h1 className="leading-none">हकदर्शक</h1>
          <h1 className="leading-none">haqdarshaq</h1>
        </div>
      ),
      bgColor: "bg-[#4f285e]",
    },
    {
      content: (
        <div className="text-[#4f285e] text-[5rem] text-center items-center">
          <div className="items-center flex flex-col justify-center">
            <h1 className="leading-none below-1265:text-[4rem] below-1265:mb-4 below-700:text-[2rem]">Getting benefits is now easy!</h1>
            <div className="bg-black relative">
              <div className="bg-pink-700 flex items-center justify-center">
                <img src="line5.png" alt=""  />
              </div>
              <img src="hqmenuimage.png" alt="sdgsd" className=" below-700:h-[25rem]" />
            </div>
          </div>
        </div>
      ),
      bgColor: "bg-[#f8e6ff]",
    },
    {
      content: (
        <>
          <div>
         
            
         <RenderStep/>
          </div>
        </>
      ),
      bgColor: "bg-[#4f285e]",
    },
  ];

  return (
    <div
      className={`h-screen flex items-center justify-center overflow-hidden ${slides[currentStep].bgColor}`}
    >
      <div
        className={`absolute w-full h-full flex items-center justify-center transition-transform duration-500 ${
          isAnimating ? "animate-exitToLeft" : "animate-enterFromRight"
        }`}
      >
        {slides[currentStep].content}
      </div>
    </div>
  );
}
