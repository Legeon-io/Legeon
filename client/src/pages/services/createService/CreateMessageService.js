import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";

export const CreateMessageService = () => {
  let initialValues = {
    serviceTitle: "",
    serviceDescription: "",
    price: null || "",
    slashPrice: null || "",
  };
  const validationSchema = Yup.object().shape({
    serviceTitle: Yup.string().required("Service title is required"),
    serviceDescription: Yup.string(),
    price: Yup.number().required("Price is required"), // Updated field name
    slashPrice: Yup.number(),
  });

  const handleSubmit = (values) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/services/message`, values, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex flex-col row-span-5 items-center justify-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => <FormikForm setFieldValue={setFieldValue} />}
      </Formik>
    </div>
  );
};

const FormikForm = (props) => {
  return (
    <Form className=" text-black w-full md:w-6/12 p-6 rounded-lg shadow-md ml-10 md:ml-0 md:mt-10 bg-gray-50">
      <div className="flex gap-3 flex-col mb-5">
        <h1 className="font-bold text-4xl">Create new messaging service</h1>
        <h1>Fill the form to create a new service</h1>
      </div>
      <div className="mb-4">
        <label
          htmlFor="serviceTitle"
          className="text-sm font-semibold text-gray-600"
        >
          Service Title
        </label>
        <Field
          name="serviceTitle"
          placeholder="Service Title"
          className="border border-black px-3 py-2 rounded w-full"
        />
        <ErrorMessage
          name="serviceTitle"
          component="div"
          className="text-red-600 text-sm"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="serviceDescription"
          className="text-sm font-semibold text-gray-600"
        >
          Service Description
        </label>
        <Field
          name="serviceDescription"
          placeholder="Service Description"
          className="border border-black px-3 py-2 rounded w-full"
        />
        <ErrorMessage
          name="serviceDescription"
          component="div"
          className="text-red-600 text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="text-sm font-semibold text-gray-600">
          Price
        </label>
        <div className="flex flex-row focus-within:border-black focus-within:border-2 rounded-md focus:outline-none">
          <div className="flex justify-center items-center px-5 text-center text-gray-600 border border-black rounded-l-md border-r-0 focus-within:border-none ">
            <h1>₹</h1>
          </div>
          <Field
            name="price"
            placeholder="Price"
            className="border border-black border-l-0 pl-8 px-3 py-2 rounded-r-md w-full focus:outline-none focus:border-none"
          />
        </div>
        <ErrorMessage
          name="price"
          component="div"
          className="text-red-600 text-sm"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="slashPrice"
          className="text-sm font-semibold text-gray-600"
        >
          Slash Price
        </label>
        <div className="flex flex-row focus-within:border-black focus-within:border-2 rounded-md focus:outline-none">
          <div className="flex justify-center items-center px-5 text-center text-gray-600 border border-black rounded-l-md border-r-0 focus-within:border-none ">
            <h1>₹</h1>
          </div>
          <Field
            name="slashPrice"
            placeholder="SlashPrice"
            className="border border-black border-l-0 pl-8 px-3 py-2 rounded-r-md w-full focus:outline-none focus:border-none"
          />
        </div>
        <ErrorMessage
          name="slashPrice"
          component="div"
          className="text-red-600 text-sm"
        />
      </div>

      <button
        type="submit"
        className="border border-black p-2 rounded-md  hover:bg-gray-200 w-1/2 md:translate-x-36  translate-x-20"
      >
        Create
      </button>
    </Form>
  );
};

export default CreateMessageService;
