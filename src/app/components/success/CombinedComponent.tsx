import React, { useState, useEffect } from "react";
import Success1 from "./Success1";
import Success2 from "./Success2";

const CombinedComponent = () => {
  const [showSuccess2, setShowSuccess2] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSuccess2(true); // Switch to Success2 after 1 second
    }, 2000);

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  return (
    <div>
      {showSuccess2 ? <Success1 /> : <Success2 />}
    </div>
  );
};

export default CombinedComponent;
