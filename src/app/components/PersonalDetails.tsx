import React, { useState, useEffect } from "react";
import { useAccountCreation } from "../accountContext";

const PersonalDetails = ({ question, stepData }) => {
  const { currentSetupStep, nextStep, prevStep, updateData } = useAccountCreation();
// Add this utility function at the top
const formatDOB = (value, prevValue) => {
  // Remove any non-digits
  const cleanValue = value.replace(/\D/g, '');
  
  // Handle backspace - if length is less than prev, just remove characters
  if (value.length < prevValue.length) {
    return value.replace(/[^\d/]/g, '');
  }

  // Add slashes automatically
  if (cleanValue.length <= 2) return cleanValue;
  if (cleanValue.length <= 4) return `${cleanValue.slice(0, 2)}/${cleanValue.slice(2)}`;
  return `${cleanValue.slice(0, 2)}/${cleanValue.slice(2, 4)}/${cleanValue.slice(4, 8)}`;
};


  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dob: '',
    age: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    gender: '',
    dobAge: ''
  });

  // Validate DOB format (dd/mm/yyyy)
  const isValidDOB = (dob) => {
    const dobRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!dobRegex.test(dob)) return false;
    
    // Additional date validation
    const [day, month, year] = dob.split('/').map(num => parseInt(num));
    const date = new Date(year, month - 1, day);
    return date.getDate() === day && 
           date.getMonth() === month - 1 && 
           date.getFullYear() === year &&
           year <= new Date().getFullYear();
  };

const handleNameChange = (e) => {
  const value = e.target.value;
  // Only allow letters and spaces
  if (value === '' || /^[A-Za-z\s]*$/.test(value)) {
    setFormData(prev => ({ ...prev, name: value }));
    setErrors(prev => ({
      ...prev,
      name: value.trim() === '' ? 'Name is required' : ''
    }));
  }
};
  const handleGenderChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, gender: value }));
    setErrors(prev => ({
      ...prev,
      gender: value === '' ? 'Gender is required' : ''
    }));
  };

const handleDOBChange = (e) => {
  const value = e.target.value;
  const formattedValue = formatDOB(value, formData.dob);
  
  if (formattedValue.length <= 10) {
    setFormData(prev => ({ ...prev, dob: formattedValue, age: '' }));
    setErrors(prev => ({
      ...prev,
      dobAge: formattedValue && !isValidDOB(formattedValue) ? 'Please enter a valid date' : ''
    }));
  }
};

  // Handle age change
  const handleAgeChange = (e) => {
    const value = e.target.value;
    if (value === '' || (/^\d{0,2}$/.test(value) && parseInt(value) <= 99)) {
      setFormData(prev => ({ ...prev, age: value, dob: '' }));
      setErrors(prev => ({
        ...prev,
        dobAge: ''
      }));
    }
  };

  // Check if form is valid
  const isFormValid = () => {
    return formData.name.trim() !== '' && 
           formData.gender !== '' && 
           (formData.dob !== '' || formData.age !== '') &&
           Object.values(errors).every(error => error === '');
  };

  // Handle next step
  const handleNext = () => {
    if (isFormValid()) {
      updateData("personalDetails", formData);
      nextStep();
    }
  };

  return (
    <div>
      <div className="below-378:flex below-445:flex-col below-445:justify-center below-445:items-center">
        {currentSetupStep.toLowerCase() !== stepData && (
          <button className="bg-white w-[5rem] rounded-2xl" onClick={prevStep}>
            <div className="text-[2rem]">&#8592;</div>
          </button>
        )}
        <div className="h-[10vh] below-445:h-[7vh] below-445:mt-4 mb-8 below-700:mb-2">
          <h1 className="text-white text-[3rem] below-700:text-[2rem] below-445:text-[1.5rem] below-321:text-[1rem]">{question}</h1>
        </div>
        <div className="bg-white w-full h-[70vh] below-321:w-[90vw] below-445:w-[80vw] rounded-2xl flex flex-col justify-around items-center">
          <div>
            <div>
              <div className="mt-2">
                <h1 className="ml-2 below-321:text-[0.8rem]">Name</h1>
                <div className="w-[25rem] below-445:w-[20rem] below-321:h-[3rem] below-378:w-[15rem] mt-2 bg-[#e5e1de] border-2 rounded-xl relative h-[4rem] px-4 border-gray-300">
                  <p className="text-[0.8rem] relative top-1 below-321:text-[0.5rem]">Full Name</p>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={handleNameChange}
                    className="bg-[#e5e1de] below-321:text-[0.8rem] below-321:h-[2rem] outline-none h-[2rem] text-[#4f285e] w-full"
                    placeholder="Enter your full Name"
                  />
                </div>
                {errors.name && <p className="text-red-500 text-sm ml-2 mt-1">{errors.name}</p>}
              </div>
            </div>
            
            <div className="border-t border-gray-300 my-4" />

            <div>
              <div className="mt-4">
                <h1 className=" below-321:text-[0.8rem]">Gender</h1>
                <div className="flex justify-around mt-2">
                  {['Male', 'Female', 'Others'].map((option) => (
                    <div key={option} className="flex items-center">
                      <input
                        type="radio"
                        id={option}
                        name="gender"
                        value={option}
                        checked={formData.gender === option}
                        onChange={handleGenderChange}
                        style={{ accentColor: "#4f285e" }}
                      />
                      <label htmlFor={option} className="ml-2 below-321:text-[0.8rem]">{option}</label>
                    </div>
                  ))}
                </div>
                {errors.gender && <p className="text-red-500 text-sm mt-1 text-center">{errors.gender}</p>}
              </div>
            </div>

            <div className="border-t border-gray-300 my-4" />

            <div className="mt-5">
              <h1 className=" below-321:text-[0.8rem]">DOB/Age</h1>
              <div className="flex mt-2">
                <div className="w-[17rem] below-445:w-[11rem] below-378:w-[8rem] below-321:h-[3rem]  mt-1 bg-[#e5e1de] border-2 rounded-xl relative h-[4rem] px-4 border-gray-300">
                  <p className="text-[0.8rem] relative top-1 below-321:text-[0.5rem]">Date of birth</p>
                  <input
                    type="text"
                    value={formData.dob}
                    onChange={handleDOBChange}
                    className="bg-[#e5e1de] below-321:text-[0.8rem] below-321:h-[2rem] outline-none h-[2rem] text-[#4f285e] w-full"
                    placeholder="dd/mm/yyyy"
                  />
                </div>
                <div className="self-center px-3 below-321:text-[0.8rem]">OR</div>
                <div className="w-[5rem] flex items-center mt-1 below-321:h-[3rem] bg-[#e5e1de] border-2 rounded-xl relative h-[4rem] px-4 border-gray-300">
                  <input
                    type="text"
                    value={formData.age}
                    onChange={handleAgeChange}
                    className="bg-[#e5e1de] below-321:text-[0.8rem] below-321:h-[2rem] outline-none h-[2rem] w-full text-[#4f285e]"
                    placeholder="Age"
                  />
                </div>
              </div>
              {errors.dobAge && <p className="text-red-500 text-sm mt-1">{errors.dobAge}</p>}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={!isFormValid()}
            className={`w-[25rem] below-321:w-[8rem]  below-321:h-[3rem]  below-321:text-[0.7rem]  below-445:w-[15rem] below-378:w-[10rem] below-378:text-[0.8rem] h-[4rem] rounded-xl text-white text-xl ${
              isFormValid() ? 'bg-[#4f285e] cursor-pointer' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;