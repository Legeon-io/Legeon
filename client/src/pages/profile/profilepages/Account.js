import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { HiOutlinePencil } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import Input from "../../../components/helper/Input";
import axios from "axios";
import Cookie from "js-cookie";
import { toast } from "react-toastify";

const Account = () => {
  const [wantEditAccount, setWantEditAccount] = useState(false);
  const [backendAccouont, setBackendAccount] = useState({
    email: "shailendra",
    mobile: "987395",
    passowrd: "Abc@123",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/profiles/getaccount", {
        headers: {
          Authorization: `Bearer ${Cookie.get("token")}`,
        },
      })
      .then((res) => {
        const { email, data } = res.data[0];
        const { mobile } = data;
        setBackendAccount({
          email: email,
          mobile: mobile,
          passowrd: "Abc@123",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-col gap-5 text-lg py-5">
      <div className="flex justify-end">
        {wantEditAccount ? (
          <RxCross1 className=" cursor-pointer" onClick={() => setWantEditAccount(false)} />
        ) : (
          <HiOutlinePencil className=" cursor-pointer" onClick={() => setWantEditAccount(true)} />
        )}
      </div>
      <div className="">
        {wantEditAccount ? (
          <Formik
            initialValues={backendAccouont}
            onSubmit={(values) => {
              axios
                .put(
                  "http://localhost:8080/api/profiles/updateaccount",
                  { values },
                  {
                    headers: {
                      Authorization: `Bearer ${Cookie.get("token")}`,
                    },
                  }
                )
                .then((res) => {
                  toast.success("Account Update Successful");
                })
                .catch((err) => {
                  console.log(err);
                  toast.error("Something Went Wrong");
                });
            }}
          >
            {() => (
              <Form className="flex flex-col gap-5 items-center">
                <div className="col-span-3 flex flex-col gap-3 w-full">
                  <Input type="text" name="email" label="Email" />
                  <Input type="text" name="mobile" label="Mobile" />
                  <Input type="password" name="passowrd" label="Passowrd" />
                </div>
                <button
                  type="submit"
                  className="border-2 border-violet-500 w-[10rem] p-2 rounded-3xl"
                >
                  Save
                </button>
              </Form>
            )}
          </Formik>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="">
              <label htmlFor="">Email</label>
              <p>{backendAccouont.email}</p>
            </div>
            <div className="">
              <label htmlFor="">Mobile Number</label>
              <p>{backendAccouont.mobile}</p>
            </div>
            <div className="">
              <label htmlFor="">Password</label>
              <p>{backendAccouont.passowrd}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
