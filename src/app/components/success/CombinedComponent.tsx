import React, { useState, useEffect, use } from "react";
import Success1 from "./Success1";
import Success2 from "./Success2";
import { useAccountCreation } from "@/app/accountContext";

const CombinedComponent = () => {
  const [showSuccess2, setShowSuccess2] = useState(false);
  const {data}=useAccountCreation();
//   const [formData, setFormData] = useState({
//     name: '',
//     gender: '',
//     dob: '',
//     age: '',
//     mobile_number: '',
//     address_state: '',
//     address_district: '',
//     address_pin_code: '',
// });

  // useEffect(() => {
  //   setFormData({
  //     name:data.personalDetails?.name,
  //     gender:data.personalDetails?.gender,
  //     age:data.personalDetails?.age,
  //     dob:data.personalDetails?.dob,
  //     mobile_number:data.phoneNumber, 
  //     address_state:data.address?.state,
  //     address_district:data.address?.district,
  //     address_pin_code:data.address?.pincode,
  //   });

  //   handleSubmit();
  // },[]);


  console.log("this is the data to add in the DB",data);


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSuccess2(true); // Switch to Success2 after 1 second
    }, 2000);

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);


//   const handleSubmit = async () => {

  

//     try {
//         const response = await fetch('http://localhost:3500/users', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(formData),
//         });

//         if (response.ok) {
//             const result = await response.json();
//             // console('User added successfully!');
//             console.log('Response:', result);
//             // Clear the form
//             setFormData({
//                 name: '',
//                 gender: '',
//                 dob: '',
//                 age: '',
//                 mobile_number: '',
//                 address_state: '',
//                 address_district: '',
//                 address_pin_code: '',
//             });
//         } else {
//             const error = await response.json();
//             // setMessage(`Error: ${error.error}`);
//             console.log('Error:', error);
//             console.error('Error:', error);
//         }
//     } catch (error) {
//         console.error('Error submitting form:', error);
//         // setMessage('Failed to add user.');
//     }
// };

  return (
    <div>
      {showSuccess2 ? <Success1 /> : <Success2 />}
    </div>
  );
};

export default CombinedComponent;
