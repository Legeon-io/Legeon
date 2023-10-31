import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function ServiceHub() {
  const isGoogle = useSelector((state) => state.profile.userData.isGoogle);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/profiles/getUserDetails`,
          {
            username: window.location.pathname.split("/")[1],
            isGoogle: isGoogle,
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
