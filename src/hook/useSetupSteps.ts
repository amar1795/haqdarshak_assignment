import { useMemo } from 'react';

const useSetupSteps = () => {
  const steps = useMemo(() => [
    {
      question: 'Which language would you prefer?',
      options: [
        { text: 'English', value: 'english' },
        { text: 'हिन्दी', value: 'हिन्दी' },
        { text: 'ಕನ್ನಡ', value: 'ಕನ್ನಡ' },
      ],
    },
    {
      question: 'How do you want to login?',
      options: [
        { text: 'Register me as a new user', value: 'Register' },
        { text: 'Use my phone number', value: 'phone' },
        { text: 'Use my yojana card', value: 'yojana' },
      ],
    },
    {
      question: 'Which type of subscription are you interested in?',
      options: [
        { text: 'Free', value: 'free' },
        { text: 'Premium', value: 'premium' },
        { text: 'Enterprise', value: 'enterprise' },
      ],
    },
    // Add more steps as needed
  ], []);

  // Utility to get data for a specific step
  const getStepData = (step) => steps[step - 1] || {};

  return { steps, getStepData };
};

export default useSetupSteps;
