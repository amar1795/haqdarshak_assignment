"use client";

import { useState } from "react";

export default function Radiobox() {
  const [selectedOption, setSelectedOption] = useState(""); // Track selected radiobox

  const options = ["Option 1", "Option 2", "Option 3", "Option 4"]; // List of options

  const handleChange = (option) => {
    setSelectedOption(option); // Update the selected option
  };

  return (
    <div className="flex flex-col items-start p-4 space-y-4">
      <h2 className="text-lg font-semibold">Select an Option:</h2>
      {options.map((option, index) => (
        <label
          key={index}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <input
            type="radio"
            name="radiobox"
            value={option}
            checked={selectedOption === option}
            onChange={() => handleChange(option)}
            className="w-5 h-5 #4f285e focus:#4f285e border-gray-300"
          />
          <span
            className={`text-sm ${
              selectedOption === option ? "#4f285e font-bold" : "text-gray-700"
            }`}
          >
            {option}
          </span>
        </label>
      ))}
    </div>
  );
}
