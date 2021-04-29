import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { axios } from "../src/utils/api/shopping";
import LoadingComponent from "../src/components/Loading";
import LoadingButton from "../src/components/LoadingButton";
import Link from "next/link";
import { Formik } from "formik";
import * as Yup from "yup";

const initiaValues = {
  email: "",
  password: "",
};

const SignInPage = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [showMessage, setShowMessage] = useState("");
  const [backDrop, setBackDrop] = useState(false);

  // Check Token
  useEffect(() => {
    const token = Cookies.get("token");

    setTimeout(() => {
      if (token) {
        setBackDrop(true);
        setTimeout(() => {
          router.replace("/dashboard");
        }, 5000);
      }
    }, 500);
  }, [isLogin]);

  return (
    <div className="bg-gray-300 flex w-full min-h-screen justify-center items-center">
      {/* Loading */}
      {backDrop ? (
        <LoadingComponent message="Page will be redirect to Dashbord in 5 second " />
      ) : null}
      <div
        className="bg-white px-20 py-14 rounded-md shadow"
        style={{ maxWidth: 620, width: "100%" }}
      >
        {/* Header Title */}
        <div className="font-mono text-3xl mb-10 text-center">SignIn</div>
        {showMessage ? (
          <p className="mx-2 mb-3 p-2 text-black text-center h-10 bg-red-200 rounded">
            {showMessage}
          </p>
        ) : null}
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
            setTimeout(async () => {
              setIsLogin(true);
              try {
                const res = await axios.post(
                  "/auth/signin",
                  { username: values.email, password: values.password },
                  {}
                );
                if ((res.status = 200)) {
                  const token = res.data.token;
                  Cookies.set("token", token, { expires: 1 });
                  setShowMessage("Welcome to E-Commerce");
                  setIsLogin(false);
                }
              } catch (err) {
                console.error(err.message);
              }

              setSubmitting(false);
            }, 1000);
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
              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex bg-blue-400 rounded py-2 text-white px-10 hover:bg-gray-200 hover:text-black space-x-3"
                >
                  {isLogin ? <LoadingButton /> : null} <p>Signin</p>
                </button>
              </div>
              <div className="mt-10">
                <p className="text-sm">
                  If you don't have a member!{" "}
                  <Link href="/signup">
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

export default SignInPage;
