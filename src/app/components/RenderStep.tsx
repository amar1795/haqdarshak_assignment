import React from "react";
import { useAccountCreation, StepType } from "../accountContext";
import MainComponent from "./MainComponent";
import { stepsData } from "@/hook/useSetupSteps";
import MobileNumber from "./MobileNumber";

const RenderStep = () => {
  const { currentSetupStep, data, updateData, errors, nextStep, prevStep } =
    useAccountCreation();
  console.log("this is the current step", currentSetupStep);
  const QuestionDisplay = () => {
    switch (currentSetupStep) {
      case StepType.LANGUAGE:
        return (
          <div>
            <MainComponent
              stepData={"language"}
              question={stepsData.LANGUAGE.question}
              radioOptions={stepsData.LANGUAGE.options}
            />
          </div>
        );

      case StepType.LOGIN_TYPE:
        return (
          <div>
            <MainComponent
              stepData={"loginType"}
              question={stepsData.LOGIN_TYPE.question}
              radioOptions={stepsData.LOGIN_TYPE.options}
            />
          </div>
        );

      case StepType.PHONE:
        return (
          <div>
            <MobileNumber
              stepData={"phoneNumber"}
              question={stepsData.PHONE_NUMBER.question}
              radioOptions={stepsData.PHONE_NUMBER.options}
            />
          </div>
        );


        case StepType.PHONE_NUMBER:
          return (
            <div>
              <MobileNumber
              stepData={"phoneNumber"}
              question={stepsData.PHONE_NUMBER.question}
              radioOptions={stepsData.PHONE_NUMBER.options}
            />
            </div>
          );
      case StepType.LOCATION:
        return (
          <div>
            <MainComponent
              stepData={"location"}
              question={stepsData.LOCATION.question}
              radioOptions={stepsData.LOCATION.options}
            />
          </div>
        );

      case StepType.ADDRESS:
        return (
          <div>
            <MainComponent
              stepData={"address"}
              question={stepsData.ADDRESS.question}
              radioOptions={stepsData.ADDRESS.options}
            />
          </div>
        );

      case StepType.PERSONAL_DETAILS:
        return (
          <div>
            <MainComponent
              stepData={"personalDetails"}
              question={stepsData.PERSONAL_DETAILS.question}
              radioOptions={stepsData.PERSONAL_DETAILS.options}
            />
          </div>
        );
      case StepType.OTP_VERIFICATION:
        return (
          <div>
            <MainComponent
              stepData={"otp"}
              question={stepsData.OTP_VERIFICATION.question}
              radioOptions={stepsData.OTP_VERIFICATION.options}
            />
          </div>
        );
      case StepType.SMART_CARD_OPTIONS:
        return (
          <div>
            <MainComponent
              stepData={"otp"}
              question={stepsData.SMART_CARD_OPTIONS.question}
              radioOptions={stepsData.SMART_CARD_OPTIONS.options}
            />
          </div>
        );

        case StepType.SETUP_COMPLETE:
        return (
          <div className=" bg-white h-screen w-[80vw]">
            <h1>Setup complete</h1>
          </div>
        );

      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div>
      {QuestionDisplay()}
      <div>
        {currentSetupStep !== StepType.LANGUAGE && (
          <button onClick={prevStep}>Previous</button>
        )}
        <button onClick={nextStep}>Next</button>
      </div>
    </div>
  );
};

export default RenderStep;
