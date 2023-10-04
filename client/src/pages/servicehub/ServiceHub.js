import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

function ServiceHub() {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/profiles/getUserDetails`,
          {
            username: window.location.pathname.split("/")[1],
          }
        );
        if (response) console.log(response.data);
      } catch (err) {
        navigate("/404");
      }
    })();
  });
  return (
    <div>
      <div>{window.location.pathname.split("/")[1]}</div>
    </div>
  );
}

export default ServiceHub;
