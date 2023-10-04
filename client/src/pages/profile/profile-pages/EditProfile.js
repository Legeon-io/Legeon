// import React, { useEffect, useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";

// import * as Yup from "yup";
// import Cookie from "js-cookie";
// import { BiSolidEdit } from "react-icons/bi";

// import logo from "../../../assets/logo.png";
// import axios from "axios";
// import { toast } from "react-toastify";

// export const EditProfile = (props) => {
//   let initialValues = {
//     firstname: "",
//     lastname: "",
//     username: "",
//     profession: "",
//     intro: "",
//     bio: "",
//   };

//   const validationSchema = Yup.object().shape({
//     firstname: Yup.string().required("First name is required"),
//     lastname: Yup.string(),
//     username: Yup.string().required("Username is required"),
//     profession: Yup.string().required("Profession is required"),
//     intro: Yup.string().required("Legion intro is required"),
//     bio: Yup.string(),
//   });
//   const handleSubmit = (values) => {
//     console.log(values);

//     axios
//       .put("http://localhost:8080/api/profiles/putprofile", values, {
//         headers: {
//           Authorization: `Bearer ${Cookie.get("token")}`,
//         },
//       })
//       .then((res) => {
//         console.log(res.data);
//         toast.success("Profile Updated Successfully");
//       })
//       .catch((err) => {
//         console.log(err);
//         toast.error("Username Taken");
//       });
//   };

//   return (
//     <div className="flex flex-col row-span-5 items-center justify-center">
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ setFieldValue }) => <FormikForm setFieldValue={setFieldValue} />}
//       </Formik>
//     </div>
//   );
// };

// const FormikForm = (props) => {
//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/api/profiles/getprofile", {
//         headers: {
//           Authorization: `Bearer ${Cookie.get("token")}`,
//         },
//       })
//       .then((res) => {
//         console.log(res.data);
//         props.setFieldValue("firstname", res.data[0].firstname);
//         props.setFieldValue("lastname", res.data[0].lastname);
//         props.setFieldValue("username", res.data[0].username);
//         if (res.data[0].data[0]) {
//           props.setFieldValue(
//             "intro",
//             res.data[0].data[0].introduction || null
//           );
//           props.setFieldValue("profession", res.data[0].data[0].profession);
//           props.setFieldValue("bio", res.data[0].data[0].bio);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   return (
//     <Form className=" text-black w-full md:w-6/12 p-6 rounded-lg shadow-md ml-10 md:ml-0 md:mt-10 bg-gray-50">
//       <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
//         <div className="flex items-center">
//           <img src={logo} alt="user image" className="h-20 w-20 rounded-full" />
//           <div className="ml-4">
//             <h1 className="text-lg font-semibold">Profile photo</h1>
//             <p className="text-sm text-gray-600">Required</p>
//           </div>
//         </div>
//       </div>

//       <div className="mb-4 flex flex-col  md:flex-row md:gap-5">
//         <div className=" md:flex-1">
//           <label
//             htmlFor="firstname"
//             className="text-sm font-semibold text-gray-600"
//           >
//             First Name
//           </label>
//           <Field
//             name="firstname"
//             placeholder="First Name"
//             className="border border-black px-3 py-2 rounded w-full"
//           />
//           <ErrorMessage
//             name="firstname"
//             component="div"
//             className="text-red-600 text-sm"
//           />
//         </div>
//         <div className=" md:flex-1">
//           <label
//             htmlFor="lastname"
//             className="text-sm font-semibold text-gray-600"
//           >
//             Last Name
//           </label>
//           <Field
//             name="lastname"
//             placeholder="Last Name"
//             className="border border-black px-3 py-2 rounded w-full"
//           />
//           <ErrorMessage
//             name="lastname"
//             component="div"
//             className="text-red-600 text-sm"
//           />
//         </div>
//       </div>
//       <div className="mb-4">
//         <label
//           htmlFor="username"
//           className="text-sm font-semibold text-gray-600"
//         >
//           Username
//         </label>
//         <Field
//           name="username"
//           placeholder="Username"
//           className="border border-black px-3 py-2 rounded w-full"
//         />
//         <ErrorMessage
//           name="username"
//           component="div"
//           className="text-red-600 text-sm"
//         />
//       </div>
//       <div className="mb-4">
//         <label
//           htmlFor="profession"
//           className="text-sm font-semibold text-gray-600"
//         >
//           Profession
//         </label>
//         <Field
//           name="profession"
//           placeholder="Profession"
//           className="border border-black px-3 py-2 rounded w-full "
//         />
//         <ErrorMessage
//           name="profession"
//           component="div"
//           className="text-red-600 text-sm"
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="intro" className="text-sm font-semibold text-gray-600">
//           Introduction
//         </label>
//         <Field
//           name="intro"
//           placeholder="Introduce yourself"
//           className="border border-black px-3 py-2 rounded w-full"
//         />
//         <ErrorMessage
//           name="intro"
//           component="div"
//           className="text-red-600 text-sm"
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="bio" className="text-sm font-semibold text-gray-600">
//           Bio
//         </label>
//         <Field
//           as="textarea"
//           name="bio"
//           placeholder="Elaborate yourself"
//           className="border border-black px-3 py-2 rounded w-full"
//         />
//         <ErrorMessage
//           name="bio"
//           component="div"
//           className="text-red-600 text-sm"
//         />
//       </div>
//       <button
//         type="submit"
//         className="border border-black p-2 rounded-md  hover:bg-gray-200 w-1/2 md:translate-x-36  translate-x-20"
//       >
//         Submit
//       </button>
//     </Form>
//   );
// };

// export default EditProfile;

import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Cookie from "js-cookie";
import { BiSolidEdit } from "react-icons/bi";
import logo from "../../../assets/logo.png";
import axios from "axios";
import { toast } from "react-toastify";
import Input from "../../../components/helper/Input";

const EditProfile = (props) => {
  const initialFormValues = {
    firstname: "",
    lastname: "",
    username: "",
    profession: "",
    intro: "",
    bio: "",
  };

  const [backendData, setBackendData] = useState(initialFormValues);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/profiles/getprofile", {
        headers: {
          Authorization: `Bearer ${Cookie.get("token")}`,
        },
      })
      .then((res) => {
        const { firstname, lastname, username, data } = res.data[0];
        const userProfileData = data[0] || {};

        // Update the form values with data from the backend
        setBackendData({
          firstname,
          lastname,
          username,
          profession: userProfileData.profession || "",
          intro: userProfileData.introduction || "",
          bio: userProfileData.bio || "",
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch profile data");
      });
  }, []);

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string(),
    username: Yup.string().required("Username is required"),
    profession: Yup.string().required("Profession is required"),
    intro: Yup.string().required("Legion intro is required"),
    bio: Yup.string().required("Bio is required"),
  });

  return (
    <div className="flex flex-col row-span-5 items-center justify-center ">
      <div className="flex flex-col gap-5 bg-gray-50 text-black rounded-lg drop-shadow-xl p-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
          <div className="flex items-center">
            <img
              src={logo}
              alt="user image"
              className="h-20 w-20 rounded-full"
            />
            <div className="ml-4">
              <h1 className="text-lg font-semibold">Profile photo</h1>
              <p className="text-sm text-gray-600">Required</p>
            </div>
          </div>
        </div>

        <Formik
          enableReinitialize
          initialValues={backendData} 
          validationSchema={validationSchema}
          onSubmit={(values) => {
            axios
              .put("http://localhost:8080/api/profiles/putprofile", values, {
                headers: {
                  Authorization: `Bearer ${Cookie.get("token")}`,
                },
              })
              .then((res) => {
                toast.success("Profile Updated Successfully");
              })
              .catch((err) => {
                console.log(err);
                toast.error("Username Taken");
              });
          }}
        >
          {() => (
            <Form className="w-[30rem] flex flex-col gap-5">
              <Input
                id="firstname"
                type="text"
                name="firstname"
                label="First Name"
              />
              <Input
                id="lastname"
                type="text"
                name="lastname"
                label="Last Name"
              />
              <Input
                id="username"
                type="text"
                name="username"
                label="Username"
              />
              <Input
                id="profession"
                type="text"
                name="profession"
                label="Profession"
              />
              <Input id="intro" type="text" name="intro" label="Introduction" />
              <Input
                as="textarea"
                id="bio"
                type="text"
                name="bio"
                label="Bio"
              />
              <button
                type="submit"
                className="border border-black p-2 rounded-md hover:bg-gray-200 w-1/2 md:translate-x-36 translate-x-20"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditProfile;
