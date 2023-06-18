import React, { useEffect } from 'react';

const Success = () => {
  useEffect(() => {
    const closeWindow = setTimeout(() => {
      window.open('', '_self').close();
    }, 1000); // Delay the closing of the window by 1 second (adjust as needed)

    return () => {
      clearTimeout(closeWindow); // Clear the timeout when the component unmounts
    };
  }, []);

  return <div>Success Page</div>; // Replace with your desired content for the Success component
};

export default Success;
