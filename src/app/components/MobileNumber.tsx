import React, { useEffect } from "react";
import { useState } from "react";
import RadioOption from "./RadioOption";
import NextButton from "./NextButton";
import { useAccountCreation } from "../accountContext";
import OtpComponent from "./OtpComponent";

const MobileNumber = ({ question, radioOptions, stepData }) => {
  const { currentSetupStep, data, errors, nextStep, prevStep, updateData } =
    useAccountCreation();
  const [showOtpConfirm, setShowOtpConfirm] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpChoice, setOtpChoice] = useState(null);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(180); // 3 minutes in seconds
  const [isTimerActive, setIsTimerActive] = useState(false); // Track timer status
  const [showResend, setShowResend] = useState(false); // Track if Resend OTP button should show

  const handlePhoneChange = (e) => {
    const phoneValue = e.target.value;

    // Allow only digits and limit to 10 digits
    if (/^\d{0,10}$/.test(phoneValue)) {
      updateData("phoneNumber", phoneValue); // Update the phone number with the allowed value

      // Show error if phone number is less than 10 digits
      if (phoneValue.length < 10) {
        setError("Phone number must be 10 digits.");
      } else {
        setError(""); // Clear the error when the phone number has 10 digits
      }
    }
  };

  // Countdown timer effect
  useEffect(() => {
    if (timer === 0) {
      setIsTimerActive(false); // Timer expired
      setShowResend(true); // Show resend OTP button
      return;
    }

    const interval = setInterval(() => {
      if (isTimerActive) {
        setTimer((prevTimer) => prevTimer - 1); // Decrease timer every second
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [timer, isTimerActive]);

  const handleResendOTP = () => {
    setOtp(new Array(6).fill("")); // Reset OTP inputs
    setTimer(180); // Reset timer to 3 minutes
    setIsTimerActive(true); // Restart the countdown
    setShowResend(false); // Hide the Resend OTP button again
    // console.log("Resend OTP triggered");
  };

  // console.log("this is the otp", otp);
  const [error, setError] = useState("");
  const handleNext = () => {
    if (!data.phoneNumber) {
      updateData("errors", { phoneNumber: "Phone number is required" });
      return;
    }
    setShowOtpConfirm(true);
  };

  const handleOtpConfirmNext = () => {
    if (otpChoice === null) {
      return; // Don't proceed if no option is selected
    }
    if (otpChoice === "no") {
      nextStep();
    } else {
      setShowOtpInput(true);
      setIsTimerActive(true); // Start the countdown
    }
  };

  return (
    <div className="flex flex-col gap-4 ">
      {currentSetupStep.toLowerCase() !== stepData && (
        <button className=" bg-white w-[5rem] rounded-2xl" onClick={prevStep}>
          <div className=" text-[2rem]">&#8592;</div>
        </button>
      )}

      {!showOtpConfirm && !showOtpInput && (
        <div className="  flex flex-col items-center  justify-center">
          <div className=" h-[10vh] mb-2  below-700:mb-1  ">
            <h1 className=" text-white text-[3rem]  below-700:text-[2rem] below-445:text-[1.5rem] below-321:text-[1.2rem]"> {question}</h1>
          </div>
          <div className="bg-white w-[50vw] below-321:w-[80vw] below-700:w-[80%] h-[70vh] rounded-2xl flex flex-col justify-around items-center">
            <div>
              <div className="mt-2 ">
                <div className="w-[20rem] below-445:w-[15rem]  mt-2 bg-[#e5e1de] border-2 rounded-xl  h-[4rem] px-4 border-gray-300 ">
                  <p className="text-[0.8rem] relative top-1 below-321:text-[0.7rem]">Mobile Number</p>
                  <input
                    type="tel"
                    id="phoneNumber"
                    onChange={handlePhoneChange}
                    value={data.phoneNumber || ""}
                    className="bg-[#e5e1de]   outline-none h-[2rem] text-[#4f285e] below-321:text-[0.8rem]"
                    placeholder="Enter your Mobile number"
                  />
                </div>
              </div>
              {error && <p className="text-red-500 text-xs mt-2 below-321:text-[0.5rem]">{error}</p>}{" "}
              {/* Display error message */}
            </div>

            <button
              onClick={handleNext}
              disabled={data?.phoneNumber?.length !== 10} // Check if phone number is exactly 10 digits
              className={`bg-[#4f285e] w-[50%] h-[4rem]  rounded-2xl flex items-center justify-center ${
                data?.phoneNumber?.length !== 10
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <h1 className="text-white below-321:text-[0.7rem]">Next</h1>
            </button>
          </div>
        </div>  
      )}

      {showOtpConfirm && !showOtpInput && (
        <div className="flex flex-col gap-4 w-[60vw] below-445:w-[20rem] below-321:items-center">
          <div className=" h-[10vh] below-445:h-[5vh] ">
            <h1 className=" text-white text-[3rem] below-321:text-[1rem]  below-700:text-[2rem] below-445:text-[1.2rem] below-445:text-center ">
              Do you want to proceed without the OTP verification
            </h1>
          </div>
          <div className=" bg-white w-full h-[70vh] below-321:w-[90vw]  below-700:h-[60vh] below-700:mt-[4vh] rounded-2xl flex flex-col  items-center ">
            <div className=" flex flex-col h-[40vh]   mt-6">
              <div className=" w-[20rem] below-445:w-[15rem] ">
                <div className=" bg-[#e5e1de] border-2 rounded-xl flex h-[4rem] px-4 border-gray-300">
                  <input
                    type="radio"
                    id="skipOtp"
                    name="otpChoice"
                    style={{ accentColor: "#4f285e" }}
                    onChange={() => setOtpChoice("no")}
                    checked={otpChoice === "no"}
                  />
                  <h1 className=" pl-2 items-center 500 self-center below-321:text-[0.7rem]">
                    Yes,proceed without OTP
                  </h1>
                </div>
              </div>

              <div className=" w-[20rem] mt-9 below-445:w-[15rem] ">
                <div className=" bg-[#e5e1de] border-2 rounded-xl flex h-[4rem] px-4 border-gray-300">
                  <input
                    type="radio"
                    id="enterOtp"
                    name="otpChoice"
                    style={{ accentColor: "#4f285e" }}
                    onChange={() => setOtpChoice("yes")}
                    checked={otpChoice === "yes"}
                  />
                  <h1 className=" pl-2 items-center 500 self-center below-321:text-[0.7rem]">
                    No,send me the OTP
                  </h1>
                </div>
              </div>
            </div>

            <button
              onClick={handleOtpConfirmNext}
              disabled={otpChoice === null}
              className={`bg-[#4f285e] w-[20rem]  below-321:w-[10rem] below-321:h-[3rem] below-445:w-[15rem] h-[4rem] rounded-2xl flex items-center justify-center ${
                otpChoice === null ? "opacity-50" : ""
              }`}
            >
              <h1 className=" text-white below-321:text-[0.8rem]">Next</h1>
            </button>
          </div>
        </div>
      )}

      {showOtpInput && (
        <div className="flex flex-col gap-4 w-[50vw] below-445:w-[80vw]">
          <div className=" h-[10vh] below-445:h-[8vh] mb-2 self-center   below-700:mb-0 ">
            <h1 className=" text-white text-[3rem] below-700:text-[2rem] below-321:text-[1.5rem]">Enter OTP</h1>
          </div>
          <div className=" bg-white w-full  h-[70vh] rounded-2xl flex flex-col justify-around items-center ">
            <div className=" w-[25rem]  below-445:w-[20rem] mt-2">
              <div className=" relative">
                {/* <h2 className="  ml-[2rem] mb-[1rem] ">Please enter OTP</h2> */}
                <OtpComponent setOtp={setOtp} setError={setError} otp={otp} />

                <p className=" self-center items-center text-gray-500 ml-[3rem] mt-[2rem] below-321:text-[0.7rem]">
                  We have sent OTP to your mobile number
                </p>
                <p className=" self-center below-321:text-[0.7rem] items-center text-[#4f285e] ml-[3rem] mt-[1rem]">
                  Resend Code in{" "}
                  <span className="mt-4 text-lg below-321:text-[0.7rem]">
                    {isTimerActive
                      ? ` ${Math.floor(timer / 60)}:${(
                          "0" +
                          (timer % 60)
                        ).slice(-2)}`
                      : "Did not received OTP ?"}
                  </span>
                </p>

                {showResend && (
                  <button
                    onClick={handleResendOTP}
                    className="mt-4 px-4 py-2 below-321:text-[0.8rem] below-445:ml-[5rem] bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              {error && (
                <span className="text-red-500 text-sm mt-1 relative left-10">{error}</span>
              )}
            </div>
            <button
              onClick={() => {
                if (otp.some((digit) => digit === "")) {
                  setError("Please enter a valid 6-digit OTP");
                  return;
                }
                nextStep();
              }}
              className="bg-[#4f285e] w-[20rem] below-445:w-[15rem] below-321:w-[10rem] below-321:h-[3rem] h-[4rem] rounded-2xl flex items-center justify-center"
            >
              <h1 className=" text-white  below-321:text-[0.8rem]">Next</h1>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNumber;
