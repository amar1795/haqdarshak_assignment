import { useAccountCreation } from '@/app/accountContext';
import React, { useEffect, useState } from 'react';

const Success1 = () => {
  const { data, resetForm } = useAccountCreation();
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dob: '',
    age: '',
    mobile_number: '',
    address_state: '',
    address_district: '',
    address_pin_code: '',
  });

  const handleSubmit = async (submissionData) => {
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
        // Reset the form data after successful submission
        setFormData({
          name: '',
          gender: '',
          dob: '',
          age: '',
          mobile_number: '',
          address_state: '',
          address_district: '',
          address_pin_code: '',
        });
        // Reset the context data
        resetForm();
      } else {
        const error = await response.json();
        console.error('Error:', error);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  useEffect(() => {
    // Only proceed if data exists and has required properties
    if (data && data.personalDetails) {
      const newFormData = {
        name: data.personalDetails?.name || '',
        gender: data.personalDetails?.gender || '',
        age: data.personalDetails?.age || '',
        dob: data.personalDetails?.dob || '',
        mobile_number: data.phoneNumber || '',
        address_state: data.address?.state || '',
        address_district: data.address?.district || '',
        address_pin_code: data.address?.pincode || '',
      };

      // First set the form data
      setFormData(newFormData);
      
      // Then make the API request with the new data
      handleSubmit(newFormData);
    }
  }, []); // Run only once when component mounts

  return (
    <div className="bg-[#4f285e]">
      <div className="flex flex-col text-center">
        <h1 className="text-white text-[2rem] mb-[2rem]">Welcome to</h1>
        <div>
          <div className="text-white text-center">
            <h1 className="leading-none text-[6rem]">हकदर्शक</h1>
            <h1 className="leading-none text-[4rem]">Haqdarshaq</h1>
          </div>
          <p className="text-white mt-5">
            Your profile has been created successfully!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Success1;