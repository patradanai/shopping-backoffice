import React, { useState, useContext } from "react";
import Cookie from "js-cookie";
import LoadingButton from "../../../../components/LoadingButton";
import { Context } from "../../../../context/Dashboard.reducer";
import { axios } from "../../../../utils/api/shopping";
import * as Yup from "yup";
import { Formik } from "formik";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: 0,
    transform: "translate(-50%, -50%)",
  },
};

const initialValues = {
  email: "",
  password: "",
  rePassword: "",
  fname: "",
  lname: "",
  phone: "",
};

const ModalStaff = (props) => {
  const context = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);
  const [showMessage, setShowMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
      <button
        className="bg-red-300 rounded px-3 py-1 text-white"
        onClick={() => setIsOpen(true)}
      >
        Add Member
      </button>
      <Modal isOpen={isOpen} style={customStyles} ariaHideApp={false}>
        <div style={{ width: 620 }}>
          {/* Header form */}
          <div className="bg-blue-300 h-10 p-2 text-center">
            <p className="text-white font-mono">Add Member</p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Invalid Email")
                .required("Require Email"),
              phone: Yup.string().required("Require Phone"),
              fname: Yup.string().required("Require FirstName"),
              lname: Yup.string().required("Require LastName"),
              password: Yup.string().min(8, "Minimun Password is 8 Char"),
              rePassword: Yup.string().oneOf(
                [Yup.ref("password"), null],
                "Password is not match"
              ),
            })}
            onSubmit={(values, { setSubmitting }) => {
              const token = Cookie.get("token");
              setIsLoading(false);
              setTimeout(async () => {
                //Fetching Moderator
                axios
                  .post(
                    "/auth/signup/moderator",
                    {
                      email: values.email,
                      fname: values.fname,
                      lname: values.lname,
                      password: values.password,
                      phone: values.phone,
                    },
                    {
                      headers: { authorization: `Bearer ${token}` },
                    }
                  )
                  .then((res) => {
                    props.onCompleted();
                    setSubmitting(false);
                    setIsOpen(false);
                    setIsLoading(true);
                  })
                  .catch((err) => {
                    setShowMessage("Found Problem Try Again!!!!");
                    setIsLoading(true);
                    console.log(err);
                  });
              }, 300);
            }}
          >
            {({ values, errors, isSubmitting, handleSubmit, handleChange }) => (
              <form onSubmit={handleSubmit} className="px-10">
                {/* fname + lname form */}
                <div className="w-fulls mt-2 mb-5 text-center">
                  <p className="text-lg font-mono bg-red-300 rounded-full p-1">
                    {context.state.shopDetails?.shopName}
                  </p>
                </div>
                <div className="flex mb-5">
                  <div className="w-1/2 flex flex-col mx-1">
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
                  <div className="w-1/2 flex flex-col mx-1">
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

                {/* Email form */}
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
                {/* Email form */}
                <div className="flex flex-col mb-5 mx-1">
                  <label className="font-mono text-sm mb-1" htmlFor="email">
                    Phone
                  </label>
                  <input
                    className="p-2 rounded border border-gray-300 focus:border-black"
                    type="text"
                    name="phone"
                    id="phone"
                    onChange={handleChange}
                    value={values.phone}
                  />
                  <p className="text-sm text-red-300">
                    {errors.phone ? errors.phone : null}
                  </p>
                </div>

                {/* Password form */}
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

                {/* rePassword form  */}
                <div className="flex flex-col mb-5 mx-1">
                  <label
                    className="font-mono text-sm mb-1"
                    htmlFor="rePassword"
                  >
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

                <p className="text-sm text-red-300">
                  Remark : Default Role is only Staff.
                </p>

                {/* Show Message */}
                {showMessage ? (
                  <p className="text-sm text-red-300">{showMessage}</p>
                ) : null}
                {/* Button */}
                {isLoading ? (
                  <div className="text-center space-x-3 my-5">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-blue-300 py-2 rounded text-white px-10 hover:bg-gray-300"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="bg-red-300 py-2 rounded text-white px-10 hover:bg-gray-300"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-center mb-5">
                    <LoadingButton />
                  </div>
                )}
              </form>
            )}
          </Formik>
        </div>
      </Modal>
    </div>
  );
};

export default ModalStaff;
