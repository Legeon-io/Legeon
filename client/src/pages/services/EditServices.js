import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { RiCloseLine } from "react-icons/ri";
import Input from "../../components/helper/Input";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCallAction } from "../../redux/service/CallAction";
import { updateMessageAction } from "../../redux/service/personalAction";

const EditServices = ({ setEditModel, value }) => {
  const initialValues = {
    serviceTitle: value.serviceTitle || "",
    serviceDescription: value.serviceDescription || "",
    duration: value.duration || "",
    price: value.price || "",
    slashPrice: value.slashPrice || "",
  };

  let createServiceSchema = Yup.object().shape({
    serviceTitle: Yup.string().required("Service title is required"),
    serviceDescription: Yup.string().required(
      "Service description is required"
    ),
    price: Yup.number()
      .required("Service price is required")
      .positive("Price must be a positive number"),
    slashPrice: Yup.number().positive("Slash price must be a positive number"),
  });

  if (value.serviceType !== "message") {
    createServiceSchema = createServiceSchema.concat(
      Yup.object().shape({
        duration: Yup.number()
          .required("Service duration is required")
          .positive("Duration must be a positive number"),
      })
    );
  }

  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-80 transition-opacity">
      <div className="flex justify-center items-center w-full h-full">
        <div
          className={`relative w-[40rem] m-2 border-2 ${value.border} bg-white rounded-xl p-5 space-y-5`}
        >
          <div
            onClick={() => setEditModel(false)}
            className={`absolute -top-3 -right-3 ${value.bgColor} rounded-full p-2 text-white`}
          >
            <RiCloseLine size={20} />
          </div>
          <div className="flex items-center gap-5 px-5">
            <span
              className={`${value.bgColor} p-5 text-5xl rounded-full text-white `}
            >
              {value.icon}
            </span>
            <div className="text-3xl">{value.serviceTitle}</div>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={createServiceSchema}
            onSubmit={async (values, { resetForm }) => {
              if (value.id === "personalDM") {
                delete values.duration;
              }

              const updatedValues = {
                ...values,
                serviceId: value._id,
                serviceType: value.serviceType,
              };

              if (updatedValues.serviceType !== "message") {
                await dispatch(updateCallAction(updatedValues));
              }

              if (updatedValues.serviceType === "message") {
                await dispatch(updateMessageAction(updatedValues));
              }

              setEditModel(false);
              resetForm();
            }}
          >
            {({ values }) => (
              <Form className="gap-10">
                <div className="space-y-4">
                  <Input
                    inputValue={values}
                    name="serviceTitle"
                    type="text"
                    label="Service Title"
                  />
                  <Input
                    inputValue={values}
                    name="serviceDescription"
                    type="text"
                    label="Description"
                  />
                  {value.serviceType !== "message" && (
                    <Input
                      inputValue={values}
                      name="duration"
                      type="text"
                      label="Duration (minutes)"
                    />
                  )}
                  <Input
                    inputValue={values}
                    name="price"
                    type="text"
                    label="Price (₹)"
                  />
                  <Input
                    inputValue={values}
                    name="slashPrice"
                    type="text"
                    label="Slash Price (₹)"
                  />
                </div>
                <div className="md:col-span-2 m-auto">
                  <button
                    type="submit"
                    className={`${value.bgColor} text-white rounded-full p-2 w-[15rem]  `}
                  >
                    Update
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default EditServices;
