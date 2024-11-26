import React, { useState } from "react";
import { useAccountCreation } from "../accountContext";

const states = [
  "Select State",
  "Andhra Pradesh/ఆంధ్ర ప్రదేశ్",
  "Karnataka/ಕನ್ನಡ",
  "Kerala/കേരളം",
  "Maharashtra/महाराष्ट्र",
  "Tamil Nadu/தமிழ்நாடு",
  "Tamil Nadu/தமிழ்நாடு",
  "Tamil Nadu/தமிழ்நாடு",
  "Tamil Nadu/தமிழ்நாடு",
  "Tamil Nadu/தமிழ்நாடு",
  "Tamil Nadu/தமிழ்நாடு",
  "Tamil Nadu/தமிழ்நாடு",
  "Tamil Nadu/தமிழ்நாடு",
  "Tamil Nadu/தமிழ்நாடு",
  "Tamil Nadu/தமிழ்நாடு",
  "Tamil Nadu/தமிழ்நாடு",
  "Tamil Nadu/தமிழ்நாடு",
  // Add more states as needed
];

const StateDropdown = ({stepData}) => {
  const [selectedState, setSelectedState] = useState(states[0]); // Default is "Select State"
  const { currentSetupStep, data, errors, nextStep, prevStep, updateData } =
  useAccountCreation();

  const handleChange = (e) => {   
    // alert('clicked') 
    // console.log('this is the stepData',stepData)
    const value = e.target.value;
    // console.log('this is the data?.language and value',data?.language,value)
    setSelectedState(value);

      updateData(stepData, value); // Update the selected language
    };

    // if(selectedState!==states[0]){
    //   nextStep();
    // }
 

  return (
    <div >

      <select
        value={selectedState}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "4px",
          fontSize: "16px",
        outline:"none" ,
        backgroundColor:"#e5e1de",      
        }}
      >

        {states.map((state, index) => (
          <option key={index} value={state}>
            {state}
          </option>
        ))}
      </select>
      {/* {selectedState !== "Select State" && (
        <div
          style={{
            marginTop: "10px",
            padding: "10px",
            background: "#f7f7f7",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          Selected: {selectedState}
        </div>
      )} */}
    </div>
  );
};

export default StateDropdown;
