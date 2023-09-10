import { useEffect } from "react";
import {
  getGoogleUserDetails,
  getUserDetails,
} from "../../redux/profile/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookie from "js-cookie";

function Dashboard() {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.profile.userData);

  useEffect(() => {
    const token = Cookie.get("token");
    const googletoken = Cookie.get("googletoken");

    if (!token) {
      dispatch(getGoogleUserDetails(googletoken));
    } else {
      dispatch(getUserDetails(token));
    }
  }, []);

  return (
    <div>
      Dashboards
      <h1>{data?.username} </h1>
      <h1>{data?.firstname} </h1>
      <h1>{data?.lastname} </h1>
      <h1>{data?.email} </h1>
    </div>
  );
}

export default Dashboard;
