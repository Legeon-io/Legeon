import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

function ServiceHub() {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .post("http://localhost:8080/api/profiles/getUserDetails", {
        username: window.location.pathname.split("/")[1],
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        navigate("/404");
      });
  });
  return (
    <div>
      <div>{window.location.pathname.split("/")[1]}</div>
    </div>
  );
}

export default ServiceHub;
