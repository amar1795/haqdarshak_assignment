"use client";
import { useState, useEffect } from "react";

const useAccountCreation = () => {
  const [currentSetupStep, setCurrentStep] = useState(1); // Track the current step

  // Initialize form data from localStorage or set default values
  const getInitialData = () => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("accountCreationData");
      return storedData ? JSON.parse(storedData) : {
        language: "",
        loginType: "",
        location: "",
        address: "",
        phoneNumber: "",
        personalDetails: "",
      };
    }
    return {
      language: "",
      loginType: "",
      location: "",
      address: "",
      phoneNumber: "",
      personalDetails: "",
    };
  };

  const [data, setData] = useState(getInitialData); // Form data
  const [errors, setErrors] = useState({}); // Track errors for each step

  useEffect(() => {
    // Save form data to localStorage whenever it changes
    if (typeof window !== "undefined") {
      localStorage.setItem("accountCreationData", JSON.stringify(data));
    }
  }, [data]); // Runs every time 'data' changes

  // Validate the current step
  const validateStep = () => {
    const newErrors = {};
    if (currentSetupStep === 1 && !data.language) {
      newErrors.language = "Language is required.";
    }
    if (currentSetupStep === 2 && !data.loginType) {
      newErrors.loginType = "Login type is required.";
    }
    if (currentSetupStep === 3 && !data.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // If no errors, validation passed
  };

  // Handle moving to the next step
  const nextStep = () => {
    if (validateStep()) {
      setErrors({}); // Clear errors
      setCurrentStep((prev) => prev + 1); // Move to the next step
    }
  };

  // Handle moving to the previous step
  const prevStep = () => {
    setErrors({}); // Clear errors
    setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev)); // Move to the previous step
  };

  // Update form data
  const updateData = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  return {
    currentSetupStep,
    data,
    errors,
    nextStep,
    prevStep,
    updateData,
  };
};

export default useAccountCreation;
