"use client"
import { useEffect, useState } from "react";

export default function Home() {
  const [isAnimating, setIsAnimating] = useState(false); // Track if the first component is animating out
  const [showSecondPage, setShowSecondPage] = useState(false); // Track which component is shown

  useEffect(() => {
    // Start the animation after 1 second
    const timer = setTimeout(() => {
      setIsAnimating(true); // Trigger the "out" animation
      setTimeout(() => setShowSecondPage(true), 1000); // Show the second page after the "out" animation completes
    }, 1000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <>
      {!showSecondPage ? (
        <div className="bg-[#4f285e] h-screen flex items-center justify-center overflow-hidden">
        <div
          className={`text-white text-[5rem] text-center ${
            isAnimating ? "animate-slideOutLeft" : "animate-slideInLeft"
          }`}
        >
          <h1 className="leading-none">हकदर्शक</h1>
          <h1 className="leading-none">haqdarshaq</h1>
        </div>
        </div>
      ) : (
        <div className="bg-[#f8e6ff] h-screen flex items-center justify-center overflow-hidden">
        <div className="text-[#4f285e] text-[5rem] text-center items-center animate-slideInRight">
          <div className=" items-center flex flex-col  justify-center ">
          <h1 className="leading-none ">Getting  benefits is 
          now easy!</h1>
         <div className=" bg-black relative ">
         <div className=" bg-pink-700 flex items-center justify-center ">
         <img src="line5.png"  alt="" />
         </div>
         <img src="hqmenuimage.png"   alt="sdgsd" />
         </div>
          </div>
          
        </div>
        </div>
      )}
   </>
  );
}
