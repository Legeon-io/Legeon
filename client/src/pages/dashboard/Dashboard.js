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

    if (token) {
      dispatch(getUserDetails(token));
    }
  }, []);

  return (
    <div>
      Dashboards
      <h1>1 {data?.username} </h1>
      <h1>2 {data?.firstname} </h1>
      <h1>3 {data?.lastname} </h1>
      <h1>4 {data?.email} </h1>
    </div>
  );
}

export default Dashboard;
