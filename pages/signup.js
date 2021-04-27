import React from "react";
import { axios } from "../src/utils/api/shopping";
import Link from "next/link";
import { Formik } from "formik";
import * as Yup from "yup";

const initiaValues = {
  email: "",
  password: "",
  rePassword: "",
  fname: "",
  lname: "",
};

const SignUpPage = () => {
  return (
    <div className="bg-gray-300 flex w-full min-h-screen justify-center items-center">
      <div
        className="bg-white px-20 py-14 rounded-md shadow"
        style={{ maxWidth: 620, width: "100%" }}
      >
        {/* Header Title */}
        <div className="font-mono text-3xl mb-10 text-center">Signup</div>

        {/* Form Validate */}
        <Formik
          initialValues={initiaValues}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Invalid Email")
              .required("Require Email"),
            fname: Yup.string().required("Require FirstName"),
            lname: Yup.string().required("Require LastName"),
            password: Yup.string().min(8, "Minimun Password is 8 Char"),
            rePassword: Yup.string().oneOf(
              [Yup.ref("password"), null],
              "Password is not match"
            ),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(async () => {
              try {
                const res = await axios.post(
                  "/auth/signup",
                  {
                    email: values.email,
                    fname: values.fname,
                    lname: values.lname,
                    password: values.password,
                  },
                  {}
                );
              } catch (err) {
                console.error(err.message);
              }
              setSubmitting(false);
            }, 300);
          }}
        >
          {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              {/* fname + lname Form*/}
              <div className="flex mb-5">
                <div className="w-full flex flex-col mx-1">
                  <label className="font-mono text-sm mb-1" htmlFor="fname">
                    FirstName
                  </label>
                  <input
                    className="p-2 rounded border border-gray-300 focus:border-black"
                    type="text"
                    name="fname"
                    id="fname"
                    onChange={handleChange}
                    value={values.fname}
                  />
                  <p className="text-sm text-red-300">
                    {errors.fname ? errors.fname : null}
                  </p>
                </div>
                <div className="flex flex-col mx-1">
                  <label className="font-mono text-sm mb-1" htmlFor="lname">
                    LastName
                  </label>
                  <input
                    className="p-2 rounded border border-gray-300 focus:border-black"
                    type="text"
                    name="lname"
                    id="lname"
                    onChange={handleChange}
                    value={values.lname}
                  />
                  <p className="text-sm text-red-300">
                    {errors.lname ? errors.lname : null}
                  </p>
                </div>
              </div>

              {/* Email Form */}
              <div className="flex flex-col mb-5 mx-1">
                <label className="font-mono text-sm mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  className="p-2 rounded border border-gray-300 focus:border-black"
                  type="text"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  value={values.email}
                />
                <p className="text-sm text-red-300">
                  {errors.email ? errors.email : null}
                </p>
              </div>

              {/* Password Form */}
              <div className="flex flex-col mb-5 mx-1">
                <label className="font-mono text-sm mb-1" htmlFor="password">
                  Password
                </label>
                <input
                  className="p-2 rounded border border-gray-300 focus:border-black"
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  value={values.password}
                />
                <p className="text-sm text-red-300">
                  {errors.password ? errors.password : null}
                </p>
              </div>

              {/* Repassword Form */}
              <div className="flex flex-col mb-10 mx-1">
                <label className="font-mono text-sm mb-1" htmlFor="rePassword">
                  Retype Password
                </label>
                <input
                  className="p-2 rounded border border-gray-300 focus:border-black"
                  type="password"
                  name="rePassword"
                  id="rePassword"
                  onChange={handleChange}
                  value={values.rePassword}
                />
                <p className="text-sm text-red-300">
                  {errors.rePassword ? errors.rePassword : null}
                </p>
              </div>

              {/*  Button  */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-400 rounded py-2 text-white px-20 hover:bg-gray-200 hover:text-black"
                >
                  Register
                </button>
              </div>
              <div className="mt-10">
                <p className="text-sm">
                  If you already have a member!{" "}
                  <Link href="/signin">
                    <span className="text-gray-500 underline cursor-pointer">
                      Go to Signin
                    </span>
                  </Link>
                </p>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUpPage;
