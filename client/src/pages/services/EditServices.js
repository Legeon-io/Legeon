import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { RiCloseLine } from "react-icons/ri";
import Input from "../../components/helper/Input";

const EditServices = ({ setEditModel, value }) => {
  const initialValues = {
    serviceTitle: value.title || "",
    serviceDescription: value.description || "",
    serviceDuration: value.duration || "",
    servicePrice: value.price || "",
    serviceSlashPrice: value.slashPrice || "",
  };

  let createServiceSchema = Yup.object().shape({
    serviceTitle: Yup.string().required("Service title is required"),
    serviceDescription: Yup.string().required(
      "Service description is required"
    ),
    servicePrice: Yup.number()
      .required("Service price is required")
      .positive("Price must be a positive number"),
    serviceSlashPrice: Yup.number().positive(
      "Slash price must be a positive number"
    ),
  });

  if (value.id !== "personalDM") {
    // If it's not "personalDM", include the service duration field and its validation
    createServiceSchema = createServiceSchema.concat(
      Yup.object().shape({
        serviceDuration: Yup.number()
          .required("Service duration is required")
          .positive("Duration must be a positive number"),
      })
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-80 transition-opacity">
      <div className="flex justify-center items-center w-full h-full">
        <div
          className={`relative w-[40rem]  border-2 ${value.border} bg-white rounded-xl p-5 space-y-5`}
        >
          <div
            onClick={() => setEditModel(false)}
            className={`absolute -top-3 -right-3 ${value.bgColor} rounded-full p-2 text-white`}
          >
            <RiCloseLine size={20} />
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={createServiceSchema}
            onSubmit={(values, { resetForm }) => {
              if (value.id === "personalDM") {
                delete values.serviceDuration;
              }
              console.log(values);
              resetForm();
            }}
          >
            {() => (
              <Form className="gap-10">
                <div className="space-y-4">
                  <Input
                    name="serviceTitle"
                    type="text"
                    label="Service Title"
                  />
                  <Input
                    name="serviceDescription"
                    type="text"
                    label="Description"
                  />
                  {value.id !== "personalDM" && (
                    <Input
                      name="serviceDuration"
                      type="text"
                      label="Duration (minutes)"
                    />
                  )}
                  <Input name="servicePrice" type="text" label="Price (₹)" />
                  <Input
                    name="serviceSlashPrice"
                    type="text"
                    label="Slash Price (₹)"
                  />
                </div>
                <div className="md:col-span-2 m-auto">
                  <button
                    type="submit"
                    className={`${value.bgColor} text-white rounded-full p-2 w-[15rem]  `}
                  >
                    Create
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
