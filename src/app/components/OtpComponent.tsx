import React, { useState } from "react";

const OtpComponent = ({setOtp,setError,otp}) => {
  // const [otp, setOtp] = useState(new Array(6).fill(""));

  

  const handleChange = (value, index) => {
    if (isNaN(value)) return; // Only allow numeric input
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");
    // Move to the next input if available
    if (value !== "" && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("text").slice(0, 6).split("");
    setOtp((prevOtp) =>
      prevOtp.map((_, index) => pastedData[index] || "")
    );
  };

  return (
    <div
      className="flex space-x-2 justify-center"
      onPaste={handlePaste}
    >
      {otp?.map((digit, index) => (
        <input
          key={index}
          id={`otp-input-${index}`}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-12 h-12 text-center text-lg border bg-[#e5e1de] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f285e] text-[#4f285e]"
        />
      ))}
    </div>
  );
};

export default OtpComponent;
