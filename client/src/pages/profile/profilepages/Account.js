import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { HiOutlinePencil } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import Input from "../../../components/helper/Input";
import axios from "axios";
import Cookie from "js-cookie";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Account = () => {
  const showPasswordField = useSelector(
    (state) => state.profile.userData.isGoogle
  );

  const [wantEditAccount, setWantEditAccount] = useState(false);
  const [backendAccount, setBackendAccount] = useState({
    email: "",
    mobile: "",
    passowrd: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/profiles/getaccount", {
        headers: {
          Authorization: `Bearer ${Cookie.get("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setBackendAccount({
          ...backendAccount,
          email: res.data[0].email,
          mobile: res.data[0].data.mobile,
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
          <RxCross1
            className=" cursor-pointer"
            onClick={() => setWantEditAccount(false)}
          />
        ) : (
          <HiOutlinePencil
            className=" cursor-pointer"
            onClick={() => setWantEditAccount(true)}
          />
        )}
      </div>
      <div className="">
        {wantEditAccount ? (
          <Formik
            initialValues={backendAccount}
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
            {({values}) => (
              <Form className="flex flex-col gap-5 items-center">
                <div className="col-span-3 flex flex-col gap-3 w-full">
                  <div className="">
                    <label htmlFor="">Email</label>
                    <p>{backendAccount.email}</p>
                  </div>
                  <Input inputValue={values} type="text" name="mobile" label="Mobile" />
                  {!showPasswordField && (
                    <Input inputValue={values} type="password" name="password" label="Password" />
                  )}
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
              <p>{backendAccount.email}</p>
            </div>
            <div className="">
              <label htmlFor="">Mobile Number</label>
              <p>{backendAccount.mobile}</p>
            </div>
            {!showPasswordField && (
              <div className="">
                <label htmlFor="">Password</label>
                <p>********</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
