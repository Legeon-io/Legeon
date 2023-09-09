import { useEffect } from "react";
import { getGoogleUserDetails } from "../../redux/profile/profileSlice";

function Dashboard() {
  useEffect(() => {
    getGoogleUserDetails();
  }, []);

  return <div>Dashboards</div>;
}

export default Dashboard;
