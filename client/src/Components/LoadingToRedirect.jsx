/** @format */

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const history = useHistory();

  useEffect(() => {
    //set Interval
    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    //redirect once count == 0
    count === 0 && history.push("/");

    //clean up function
    return () => clearInterval(interval);
  }, [count, history]);
  return (
    <div className='container p-5 text-center'>
      <p>Redirecting you in {count} seconds</p>
    </div>
  );
};

export default LoadingToRedirect;
