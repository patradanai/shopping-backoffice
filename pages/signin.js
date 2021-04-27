import React from "react";
import axios from "../src/utils/api/shopping";
import Link from "next/link";
import { Formik } from "formik";
import * as Yup from "yup";

const initiaValues = {
  email: "",
  password: "",
};

const SignIn = () => {
  return (
    <div className="bg-gray-300 flex w-full min-h-screen justify-center items-center">
      <div
        className="bg-white px-20 py-14 rounded-md shadow"
        style={{ maxWidth: 620, width: "100%" }}
      >
        {/* Header Title */}
        <div className="font-mono text-3xl mb-10 text-center">SignIn</div>

        {/* Form Validate */}
        <Formik
          initialValues={initiaValues}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Invalid Email")
              .required("Require Email"),
            password: Yup.string().min(8, "Minimun Password is 8 Char"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setTimeout(async () => {
              const res = await axios.post("/signin", {
                data: { email: values.email, password: values.passoword },
              });

              if (res.ok) {
                console.log(res.data);
              }

              setSubmitting(false);
            }, 300);
          }}
        >
          {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
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
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-400 rounded py-2 text-white px-20 hover:bg-gray-200 hover:text-black"
                >
                  Signin
                </button>
              </div>
              <div className="mt-10">
                <p className="text-sm">
                  If you don't have a member!{" "}
                  <Link href="/signin">
                    <span className="text-gray-500 underline cursor-pointer">
                      Join with us
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

export default SignIn;
