// accountContext.tsx
"use client";
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

// Define all possible steps
export enum StepType {
  LANGUAGE = 'LANGUAGE',
  LOGIN_TYPE = 'LOGIN_TYPE',
  
  // Registration steps
  LOCATION = 'LOCATION',
  ADDRESS = 'ADDRESS',
  PHONE = 'PHONE',
  PERSONAL_DETAILS = 'PERSONAL_DETAILS',
  SETUP_COMPLETE = 'SETUP_COMPLETE',
  // Phone login steps
  PHONE_NUMBER = 'PHONE_NUMBER',
  OTP_VERIFICATION = 'OTP_VERIFICATION',
  // Smart card steps
  SMART_CARD_OPTIONS = 'SMART_CARD_OPTIONS',
  CARD_NUMBER = 'CARD_NUMBER',
  CARD_SCAN = 'CARD_SCAN',
}

export enum LoginType {
  REGISTER = 'REGISTER',
  PHONE = 'PHONE',
  SMART_CARD = 'SMART_CARD',
}

interface AccountData {
  language: string;
  loginType: LoginType | '';
  location: string;
  address: string;
  phoneNumber: string;
  personalDetails: string;
  otp: string;
  cardNumber: string;
  cardScanData: string;
}

interface StepConfig {
  type: StepType;
  required: boolean;
}

interface AccountContextType {
  currentSetupStep: StepType;
  data: AccountData;
  errors: Record<string, string>;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (field: keyof AccountData, value: string) => void;
  resetForm: () => void;
  isValid: () => boolean;
  totalSteps: number;
  currentStepNumber: number;
}

const INITIAL_DATA: AccountData = {
  language: "",
  loginType: "",
  location: "",
  address: "",
  phoneNumber: "",
  personalDetails: "",
  otp: "",
  cardNumber: "",
  cardScanData: "",
};

// console.log("this is the initial data",INITIAL_DATA);

// Define step sequences for each login type
const STEP_SEQUENCES: Record<LoginType, StepConfig[]> = {
  [LoginType.REGISTER]: [
    { type: StepType.LANGUAGE, required: true },
    { type: StepType.LOGIN_TYPE, required: true },
    { type: StepType.LOCATION, required: true },
    { type: StepType.ADDRESS, required: true },
    { type: StepType.PHONE, required: true },
    { type: StepType.PERSONAL_DETAILS, required: true },
    { type: StepType.SETUP_COMPLETE, required: true },
  ],
  [LoginType.PHONE]: [
    { type: StepType.LANGUAGE, required: true },
    { type: StepType.LOGIN_TYPE, required: true },
    { type: StepType.PHONE_NUMBER, required: true },
    // { type: StepType.OTP_VERIFICATION, required: true },
    { type: StepType.SETUP_COMPLETE, required: true },
  ],
  [LoginType.SMART_CARD]: [
    { type: StepType.LANGUAGE, required: true },
    { type: StepType.LOGIN_TYPE, required: true },
    { type: StepType.SMART_CARD_OPTIONS, required: true },
    // The following steps are conditional based on the smart card option selected
    // { type: StepType.CARD_NUMBER, required: false },
    // { type: StepType.CARD_SCAN, required: false },
    // { type: StepType.PHONE_NUMBER, required: false },
    // { type: StepType.OTP_VERIFICATION, required: false },
    { type: StepType.SETUP_COMPLETE, required: false },
  ],
};

const AccountContext = createContext<AccountContextType | null>(null);

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<AccountData>(() => {
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

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Get current step sequence based on login type
  const getCurrentStepSequence = useCallback(() => {
    if (!data.loginType) {
      return STEP_SEQUENCES[LoginType.REGISTER].slice(0, 2); // Only show language and login type initially
    }
    return STEP_SEQUENCES[data.loginType as LoginType];
  }, [data.loginType]);

  const currentSetupStep = (getCurrentStepSequence()|| [])[currentStepIndex]?.type || StepType.LANGUAGE;

  // Validation logic for each step type
  const validateStep = useCallback(() => {
    const newErrors: Record<string, string> = {};
    const currentStepConfig = getCurrentStepSequence()[currentStepIndex];

    if (!currentStepConfig?.required) {
      return true;
    }

    switch (currentStepConfig.type) {
      case StepType.LANGUAGE:
        if (!data.language) newErrors.language = "Language is required.";
        break;
      case StepType.LOGIN_TYPE:
        if (!data.loginType) newErrors.loginType = "Login type is required.";
        break;
      case StepType.PHONE_NUMBER:
      case StepType.PHONE:
        if (!data.phoneNumber) newErrors.phoneNumber = "Phone number is required.";
        break;
      case StepType.OTP_VERIFICATION:
        if (!data.otp) newErrors.otp = "OTP is required.";
        break;
      case StepType.LOCATION:
        if (!data.location) newErrors.location = "Location is required.";
        break;
      case StepType.ADDRESS:
        if (!data.address) newErrors.address = "Address is required.";
        break;
      case StepType.PERSONAL_DETAILS:
        if (!data.personalDetails) newErrors.personalDetails = "Personal details are required.";
        break;
      case StepType.CARD_NUMBER:
        if (!data.cardNumber) newErrors.cardNumber = "Card number is required.";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [currentStepIndex, data, getCurrentStepSequence]);

  const nextStep = useCallback(() => {
    if (validateStep()) {
      setErrors({});
      const maxSteps = getCurrentStepSequence().length;
      setCurrentStepIndex(prev => Math.min(prev + 1, maxSteps - 1));
    }
  }, [validateStep, getCurrentStepSequence]);

  const prevStep = useCallback(() => {
    setErrors({});
    setCurrentStepIndex(prev => Math.max(prev - 1, 0));
  }, []);

  const updateData = useCallback((field: keyof AccountData, value: string) => {
    setData(prev => {
      // alert('update Data')
    
      const newData = { ...prev, [field]: value };
      // Reset subsequent steps if login type changes
      if (field === 'loginType') {
        return {
          ...INITIAL_DATA,
          language: prev.language,
          loginType: value as LoginType,
        };
      }
      return newData;
    });
  }, [data]);

  const resetForm = useCallback(() => {
    setData(INITIAL_DATA);
    setCurrentStepIndex(0);
    setErrors({});
    if (typeof window !== "undefined") {
      localStorage.removeItem("accountCreationData");
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("accountCreationData", JSON.stringify(data));
        // console.log("this is the data",data);
        // console.log("this is the current step",currentSetupStep);
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    }
  }, [data]);

  const value: AccountContextType = {
    currentSetupStep,
    data,
    errors,
    nextStep,
    prevStep,
    updateData,
    resetForm,
    isValid: validateStep,
    totalSteps: getCurrentStepSequence().length,
    currentStepNumber: currentStepIndex + 1,
  };

  return (
    <AccountContext.Provider value={value}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccountCreation = (): AccountContextType => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccountCreation must be used within an AccountProvider");
  }
  return context;
};