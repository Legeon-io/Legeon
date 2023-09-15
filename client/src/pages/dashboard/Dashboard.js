import { useEffect } from "react";
import { getUserDetails } from "../../redux/profile/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookie from "js-cookie";
import { CalendarDays, Mail } from "lucide-react";
import Input from "../../components/helper/Input";
import { Form, Formik } from "formik";

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
    <div className="bg-gray-200 h-screen p-5">
      <div>
        <h1 className="text-4xl font-semibold">Services</h1>
      </div>
      <div className="mt-2">Create service</div>
      <div className="p-5 flex gap-5">
        <button className="p-5 flex items-center gap-5 hover:bg-gray-50 focus:bg-gray-50 hover:shadow-sm focus:shadow-sm rounded-2xl ">
          <CalendarDays size={30} />
          <div className="text-xl">1:1 Call</div>
        </button>
        <button className="p-5 flex items-center gap-5 hover:bg-gray-50 focus:bg-gray-50 hover:shadow-sm focus:shadow-sm rounded-2xl ">
          <Mail size={30} />
          <div className="text-xl">Priority DM</div>
        </button>
      </div>
      <Formik
        initialValues={{
          title: "",
        }}
        onSubmit={(values) => {}}
      >
        {() => (
          <Form className="flex flex-col gap-5">
            <Input id="title" type="text" name="title" label="Title" />
            <button
              type="button"
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-2 w-[10rem] text-white rounded-3xl hover:opacity-80  duration-300"
            >
              Forget Password ?
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Dashboard;
