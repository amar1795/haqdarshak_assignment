import React, { useState, useEffect } from "react";
import Success1 from "./Success1";
import Success2 from "./Success2";
import { useAccountCreation } from "@/app/accountContext";

const CombinedComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isPostSuccess, setIsPostSuccess] = useState(false);
  const { data, resetForm } = useAccountCreation();

  const loginType= data.loginType;

  console.log("this is the login type",loginType);
  const handleFormSubmission = async (submissionData) => {
    try {
      const response = await fetch('http://localhost:3500/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Response:', result);
        setIsPostSuccess(true);
        
        // Show Success1 for 3 seconds after successful POST
        setTimeout(() => {
          setCurrentPage(2);
          // Reset everything after showing Success1 for 3 seconds
          setTimeout(() => {
            resetForm();
            setCurrentPage(1);
            setIsPostSuccess(false);
          }, 3000);
        }, 3000);
      } else {
        const error = await response.json();
        resetForm();

        console.error('Error:', error);
      }
    } catch (error) {
      resetForm();

      console.error('Error submitting form:', error);
    }
  };

  useEffect(() => {
    if (loginType === "REGISTER" && data && data.personalDetails && !isPostSuccess) {
      const formData = {
        name: data.personalDetails?.name || '',
        gender: data.personalDetails?.gender || '',
        age: data.personalDetails?.age || '',
        dob: data.personalDetails?.dob || '',
        mobile_number: data.phoneNumber || '',
        address_state: data.address?.state || '',
        address_district: data.address?.district || '',
        address_pin_code: data.address?.pincode || '',
      };
      
      // Use a ref to track if submission has been made
      const controller = new AbortController();
      // if(loginType === "REGISTER"){

      // } 
      handleFormSubmission(formData);
    
      
      
      return () => {
        controller.abort(); // Cleanup on unmount or re-render
      };
    }

    else{
      setTimeout(() => {
        setCurrentPage(2);
        // Reset everything after showing Success1 for 3 seconds
        setTimeout(() => {
          resetForm();
          setCurrentPage(1);
          setIsPostSuccess(false);
        }, 3000);
      }, 3000);

    }
  }, [data]); 

  return (
    <div className="flex justify-center items-center min-h-screen">
      {currentPage === 1 ? <Success2 /> : <Success1 />}
    </div>
  );
};

export default CombinedComponent;