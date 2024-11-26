import React, { useState, useEffect } from "react";
import { useAccountCreation } from "../accountContext";
import state from "../state.json";

const AddressComponent = ({ question, stepData }) => {
  const { currentSetupStep, errors, nextStep, prevStep, updateData } =
    useAccountCreation();
  const [selectedState, setSelectedState] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");


  const [formData, setFormData] = useState({
    state: '',
    disctrict: '',
    pincode: '',
    
  });


  // Transform the state data for easier access
  const stateData = React.useMemo(() => {
    const data = {};
    state.India.forEach((item) => {
      data[item.state] = item.districts;
    });
    return data;
  }, []);

  const handleNext = () => {
    updateData("address", formData);
    nextStep();
  }

    
  // Update districts when state changes
  useEffect(() => {
    if (selectedState) {
      setDistricts(stateData[selectedState] || []);
      setSelectedDistrict(""); // Reset district when state changes
    }
  }, [selectedState, stateData]);

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setFormData((prev) => ({ ...prev, state: e.target.value }));
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setFormData((prev) => ({ ...prev, district: e.target.value }));

  };
  const handlePincodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digits

    if (value.length <= 5) {
      // Only allow up to 5 digits
      setPincode(value);
      setFormData((prev) => ({ ...prev, pincode: e.target.value }));


      // Validate length
      if (value.length === 0) {
        setPincodeError("PIN code is required");
      } else if (value.length < 5) {
        setPincodeError("PIN code must be 5 digits");
      } else {
        setPincodeError("");
      }
    }
  };

  return (
    <div>
      {currentSetupStep !== "LANGUAGE" && (
        <button className="bg-white w-[5rem] rounded-2xl" onClick={prevStep}>
          <div className="text-[2rem]">&#8592;</div>
        </button>
      )}
      <div>
        {currentSetupStep.toLowerCase() !== stepData && (
          <button className="bg-white w-[5rem] rounded-2xl" onClick={prevStep}>
            <div className="text-[2rem]">&#8592;</div>
          </button>
        )}
        <div className="h-[10vh] below-445:h-[5vh] below-445:mt-4  mb-8 below-700:mb-1">
          <h1 className="text-white text-[3rem] below-700:text-[2rem] below-445:text-[1.5rem]  below-321:text-[1.2rem]  ">{question}</h1>
        </div>
        <div className="bg-white w-full h-[70vh]  below-321:w-[85vw] rounded-2xl flex flex-col justify-around items-center">
          <div>
            {/* State Dropdown */}
            <div className="w-[20rem] below-445:w-[15rem] bg-[#e5e1de] border-2 rounded-xl relative below-321:h-[3rem] h-[4rem] px-4 border-gray-300">
              <p className="text-[0.8rem] relative top-1 below-321:text-[0.5rem]">State</p>
              <select
                value={selectedState}
                onChange={handleStateChange}
                className="w-full bg-[#e5e1de] outline-none h-[2rem] below-321:text-[0.5rem] "
              >
                <option value="" className="below-321:text-[0.5rem]">Select State</option>
                {Object.keys(stateData).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* District Dropdown */}
            <div className="w-[20rem] below-445:w-[15rem] mt-5 bg-[#e5e1de] border-2 rounded-xl below-321:h-[3rem] relative h-[4rem] px-4 border-gray-300">
              <p className="text-[0.8rem] relative top-1 below-321:text-[0.5rem]">District</p>
              <select
                value={selectedDistrict}
                onChange={handleDistrictChange}
                className="w-full bg-[#e5e1de] outline-none h-[2rem] below-321:text-[0.5rem]"
                disabled={!selectedState}
              >
                <option value="" className="below-321:text-[0.5rem]">Select District</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            {/* Pincode Input */}
            <div className="w-[20rem] below-445:w-[15rem] mt-5 bg-[#e5e1de] border-2 rounded-xl relative below-321:h-[3rem] h-[4rem] px-4 border-gray-300">
              <p className="text-[0.8rem] relative top-1 below-321:text-[0.6rem] " >Pin code</p>
              <input
                type="text"
                value={pincode}
                onChange={handlePincodeChange}
                className="w-[15rem] below-445:w-[80%] bg-[#e5e1de]  outline-none h-[2rem] absolute below-321:text-[0.5rem]"
                placeholder="Please enter the pin code"
                maxLength={5}
              />
              {pincodeError && (
                <p className="text-red-500 text-sm mt-5  relative top-7">
                  {pincodeError}
                </p>
              )}
            </div>
          </div>

          {errors?.language && (
            <p className="text-red-500">{errors?.language}</p>
          )}

          <div>
            <button
              onClick={handleNext}
              disabled={!selectedState || !selectedDistrict || !pincode}
              className={` bg-[#4f285e] w-[20rem] below-445:w-[15rem] below-321:h-[3rem] below-321:w-[10rem] h-[4rem] rounded-2xl flex items-center justify-center ${
                !selectedState || !selectedDistrict || pincode.length !== 5
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <h1 className=" text-white below-321:text-[0.7rem]">Next</h1>
            </button>

            {/* <button
              onClick={nextStep}
              disabled={!selectedState || !selectedDistrict || !pincode}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg disabled:bg-gray-300"
            >
              Next
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressComponent;
