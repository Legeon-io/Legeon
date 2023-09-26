import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export const CreateMessageService = () => {
  let initialValues = {
    serviceTitle: "",
    serviceDescription: "",
    Price: "",
    SlashPrice: "",
  };
  const validationSchema = Yup.object().shape({
    serviceTitle: Yup.string().required("Service title is required"),
    serviceDescription: Yup.string(),
    Price: Yup.string().required("Price is required"), // Updated field name
    SlashPrice: Yup.string(),
  });

  const handleSubmit = (values) => {
    console.log(values);
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
        <label htmlFor="Price" className="text-sm font-semibold text-gray-600">
          Price
        </label>
        <Field
          name="Price"
          placeholder="Price"
          className="border border-black px-3 py-2 rounded w-full"
        />
        <ErrorMessage
          name="Price"
          component="div"
          className="text-red-600 text-sm"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="SlashPrice"
          className="text-sm font-semibold text-gray-600"
        >
          Slash Price
        </label>
        <Field
          name="SlashPrice"
          placeholder="Slash Price in Rs"
          className="border border-black px-3 py-2 rounded w-full"
        />
        <ErrorMessage
          name="SlashPrice"
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
