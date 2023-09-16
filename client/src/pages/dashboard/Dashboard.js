import { useEffect } from "react";
import { getUserDetails } from "../../redux/profile/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookie from "js-cookie";
import { CalendarDays, Mail } from "lucide-react";
import Input from "../../components/helper/Input";
import { Form, Formik } from "formik";

function Dashboard() {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>hi</h1>
    </div>
  );
}

export default Dashboard;
