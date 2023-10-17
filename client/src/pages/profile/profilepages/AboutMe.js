import { Form, Formik } from "formik";
import React, { useState } from "react";
import Input from "../../../components/helper/Input";
import { RxCross1 } from "react-icons/rx";
import { HiOutlinePencil } from "react-icons/hi";
import axios from "axios";
import { toast } from "react-toastify";
import Cookie from "js-cookie";

const AboutMe = ({ backendData }) => {
  const [wantEditAbout, setWantEditAbout] = useState(false);

  return (
    <div className="flex flex-col gap-5 text-lg py-5">
      <div className="flex justify-end">
        {wantEditAbout ? (
          <RxCross1
            className=" cursor-pointer"
            onClick={() => setWantEditAbout(false)}
          />
        ) : (
          <HiOutlinePencil
            className=" cursor-pointer"
            onClick={() => setWantEditAbout(true)}
          />
        )}
      </div>
      <div>
        {wantEditAbout ? (
          <div className="">
            <Formik
              initialValues={{
                intro: backendData.intro,
                profession: backendData.profession,
                bio: backendData.bio,
                language: backendData.language,
              }}
              onSubmit={(values) => {
                values = { ...backendData, ...values };
                axios
                  .put(
                    "http://localhost:8080/api/profiles/putprofile",
                    values,
                    {
                      headers: {
                        Authorization: `Bearer ${Cookie.get("token")}`,
                      },
                    }
                  )
                  .then((res) => {
                    window.location.reload();
                  })
                  .catch((err) => {
                    console.log(err);
                    toast.error("Username Taken");
                  });
                setWantEditAbout(false);
              }}
            >
              {() => (
                <Form className="flex flex-col gap-5 items-center">
                  <div className="col-span-3 flex flex-col gap-3 w-full">
                    <Input type="text" name="intro" label="Introduction" />
                    <Input
                      as="textarea"
                      type="text"
                      name="bio"
                      label="Bio"
                      className="w-full scroll h-[15rem]"
                    />
                    <Input type="text" name="profession" label="Profession" />
                    <Input type="text" name="language" label="Language" />
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
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="">
              <label htmlFor="">Introduction</label>
              <p>{backendData.intro}</p>
            </div>
            <div className="">
              <label htmlFor="">Bio</label>
              <p>{backendData.bio}</p>
            </div>
            <div className="">
              <label htmlFor="">Profession</label>
              <p>{backendData.profession}</p>
            </div>
            <div className="">
              <label htmlFor="">Language Spoken</label>
              <p>{backendData.language}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutMe;
