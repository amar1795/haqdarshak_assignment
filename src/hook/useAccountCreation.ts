import { useState } from "react";

const useAccountCreation = () => {
  const [data, setData] = useState({
    language: "",
    loginType: "",
    location: "",
    address: "",
    phoneNumber: "",
    personalDetails: "",
  });

  const [currentStep, setCurrentStep] = useState(1);

  const validateStep = () => {
    switch (currentStep) {
      case 1: // Validate language
        return data.language !== "";
      case 2: // Validate login type
        return data.loginType !== "";
      case 3: // Validate phone number
        return data.phoneNumber !== "";
      case 4: // Validate location and address
        return data.location !== "" && data.address !== "";
      case 5: // Validate personal details
        return data.personalDetails !== "";
      default:
        return false;
    }
  };

  const goToNextStep = () => {
    if (validateStep()) {
      setCurrentStep((prev) => prev + 1);
    } else {
      alert("Please complete the current step before proceeding.");
    }
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const updateField = (field, value) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return {
    data,
    currentStep,
    goToNextStep,
    goToPreviousStep,
    updateField,
  };
};

export default useAccountCreation;
