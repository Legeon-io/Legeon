import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import Input from "../../components/helper/Input";
import { FiMessageSquare, FiPhoneCall } from "react-icons/fi";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { insertCallAction } from "../../redux/service/CallAction";
import { insertMessageAction } from "../../redux/service/personalAction";

const CreateServices = () => {
  const initialValues = {
    serviceTitle: "",
    serviceType: "select",
    serviceDescription: "",
    duration: "",
    price: "",
    slashPrice: "",
  };

  const createServiceSchema = Yup.object().shape({
    serviceTitle: Yup.string().required("Service title is required"),
    serviceType: Yup.string().notOneOf(
      ["select"],
      "Please select a service type"
    ),
    serviceDescription: Yup.string().required(
      "Service description is required"
    ),
    price: Yup.number()
      .required("Service price is required")
      .positive("Price must be a positive number"),
    serviceSlashPrice: Yup.number().positive(
      "Slash price must be a positive number"
    ),
    duration: Yup.number().test(
      "conditional-validation",
      "Service duration is required",
      function (value) {
        const serviceType = this.parent.serviceType;
        if (serviceType !== "message") {
          return Yup.number()
            .required("Service duration is required")
            .positive("Duration must be a positive number")
            .validateSync(value, { abortEarly: false });
        }
        return true;
      }
    ),
  });

  const dispatch = useDispatch();

  return (
    <div className="md:p-10 p-2 space-y-10">
      <div className="md:text-left text-center text-4xl">
        Create New Service
      </div>
      {/* Form */}
      <Formik
        initialValues={initialValues}
        validationSchema={createServiceSchema}
        onSubmit={(values, { resetForm }) => {
          if (values.serviceType === "message") {
            delete values.duration;
          }
          if (values.serviceType === "onetoone")
            dispatch(insertCallAction(values));
          else if (values.serviceType === "message") {
            dispatch(insertMessageAction(values));
          }
          resetForm();
        }}
      >
        {({ values }) => (
          <Form className="grid md:grid-cols-2 gap-10">
            <div className=" space-y-4">
              <Input name="serviceTitle" type="text" label="Service Title" />
              <Input
                name="serviceDescription"
                type="text"
                label="Description"
              />
              {values.serviceType !== "message" && (
                <Input name="duration" type="text" label="Duration (minutes)" />
              )}
              <Input name="price" type="text" label="Price  (₹)" />
              <Input name="slashPrice" type="text" label="Slash Price (₹)" />
            </div>
            <div className="space-y-2">
              <div className="text-xl font-bold">Service Type</div>
              <div className="space-y-5">
                <div className="flex gap-5">
                  <label
                    htmlFor="onetoone"
                    className={`sm:w-[12rem] h-[10rem] border-2 ${
                      values.serviceType === "onetoone"
                        ? "border-indigo-500 text-indigo-500"
                        : "border-gray-300 text-gray-500"
                    } rounded-xl flex flex-col justify-around items-start`}
                  >
                    <Field
                      id="onetoone"
                      type="radio"
                      name="serviceType"
                      value="onetoone"
                      className="hidden"
                    />
                    <div className="p-2 space-y-2">
                      <FiPhoneCall size={30} />
                      <div className="text-xl font-bold">1 : 1 Call</div>
                      <div className="text-sm">Lorem ipsum dolor sit amet.</div>
                    </div>
                  </label>
                  <label
                    htmlFor="message"
                    className={`sm:w-[12rem] h-[10rem] border-2 ${
                      values.serviceType === "message"
                        ? "border-pink-500 text-pink-500"
                        : "border-gray-300 text-gray-500"
                    } rounded-xl flex flex-col justify-around items-start`}
                  >
                    <Field
                      id="message"
                      type="radio"
                      name="serviceType"
                      value="message"
                      className="hidden"
                    />
                    <div className="p-2 space-y-2">
                      <FiMessageSquare size={30} />
                      <div className="text-xl font-bold">Personal DM</div>
                      <div className="text-sm">Lorem ipsum dolor sit amet.</div>
                    </div>
                  </label>
                </div>
                <div className="text-red-700 text-[12px]">
                  <ErrorMessage name="serviceType" />
                </div>
              </div>
            </div>
            <div className="md:col-span-2 m-auto">
              <button
                type="submit"
                className="border-2 border-black bg-black text-white rounded-full p-2 w-[15rem]"
              >
                Create
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateServices;
