// accountContext.js
"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";

const INITIAL_DATA = {
  language: "",
  loginType: "",
  location: "",
  address: "",
  phoneNumber: "",
  personalDetails: "",
};

const AccountContext = createContext(null);

export const AccountProvider = ({ children }) => {
  const [currentSetupStep, setCurrentStep] = useState(1);
  const [data, setData] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const storedData = localStorage.getItem("accountCreationData");
        return storedData ? JSON.parse(storedData) : INITIAL_DATA;
      } catch (error) {
        console.error("Error reading from localStorage:", error);
        return INITIAL_DATA;
      }
    }
    return INITIAL_DATA;
  });
  const [errors, setErrors] = useState({});

  const validateStep = useCallback(() => {
    const newErrors = {};
    switch (currentSetupStep) {
      case 1:
        if (!data.language?.trim()) {
          newErrors.language = "Language is required.";
        }
        break;
      case 2:
        if (!data.loginType?.trim()) {
          newErrors.loginType = "Login type is required.";
        }
        break;
      case 3:
        if (!data.phoneNumber?.trim()) {
          newErrors.phoneNumber = "Phone number is required.";
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [currentSetupStep, data.language, data.loginType, data.phoneNumber]);

  useEffect(() => {
    console.log("Data updated:", data);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("accountCreationData", JSON.stringify(data));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    }
  }, [data]);

  const nextStep = useCallback(() => {
    if (validateStep()) {
      setErrors({});
      setCurrentStep(prev => prev + 1);
    }
  }, [validateStep]);

  const prevStep = useCallback(() => {
    setErrors({});
    setCurrentStep(prev => Math.max(1, prev - 1));
  }, []);

  const updateData = useCallback((field, value) => {
    setData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const resetForm = useCallback(() => {
    setData(INITIAL_DATA);
    setCurrentStep(1);
    setErrors({});
    if (typeof window !== "undefined") {
      localStorage.removeItem("accountCreationData");
    }
  }, []);

  const value = {
    currentSetupStep,
    data,
    errors,
    nextStep,
    prevStep,
    updateData,
    resetForm,
    isValid: validateStep,
  };

  return (
    <AccountContext.Provider value={value}>
      {children}
    </AccountContext.Provider>
  );
};

// Custom hook to use the account context
export const useAccountCreation = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccountCreation must be used within an AccountProvider");
  }
  return context;
};