import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
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
  name: "",
  price: 0,
  quantity: 0,
  description: "",
  imageSrc: "",
};

const ModalProduct = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        className="bg-red-300 rounded px-3 py-1 text-white"
        onClick={() => setIsOpen(true)}
      >
        Add Product
      </button>
      <Modal isOpen={isOpen} style={customStyles}>
        <div style={{ width: 620 }}>
          {/* Header form */}
          <div className="bg-blue-300 h-10 p-2 text-center">
            <p className="text-white font-mono">Add Product</p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Name is required"),
              price: Yup.number("Please fill number")
                .integer("Can't Minus")
                .min(0, "Minimun is 0 price")
                .required("Price is required"),
              description: Yup.string().required("Description is required"),
              imageSrc: Yup.string().required(),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
              }, 300);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit} className="px-10">
                {/* Image  */}
                <div className="flex justify-center mt-3 mb-5">
                  <div className="w-20 h-20 rounded-full bg-gray-400"></div>
                </div>

                {/*  */}
                <div className="mb-5 flex">
                  <label
                    className="w-1/3 font-mono text-sm mb-1 mr-2"
                    htmlFor="name"
                  >
                    Product Name :
                  </label>
                  <input
                    className="w-full border-b-2 outline-none px-2"
                    type="text"
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                  <p className="text-sm text-red-300">
                    {errors.name || touched.name ? errors.name : null}
                  </p>
                </div>

                {/*  */}
                <div className="mb-5">
                  <label className="font-mono text-sm mb-1" htmlFor="price">
                    Price :
                  </label>
                  <input
                    className="border-b-2 outline-none px-2"
                    type="text"
                    id="price"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                  />
                  <p className="text-sm text-red-300">
                    {errors.price || touched.price ? errors.price : null}
                  </p>
                </div>

                {/*  */}
                <div className="flex flex-col mb-5">
                  <label
                    className="font-mono text-sm mb-1"
                    htmlFor="description"
                  >
                    Description :
                  </label>
                  <textarea
                    className="border border-gray-300 rounded resize-none"
                    type="text"
                    id="description"
                    name="description"
                    style={{ height: 100 }}
                    value={values.description}
                    onChange={handleChange}
                  />
                  <p className="text-sm text-red-300">
                    {errors.description || touched.description
                      ? errors.description
                      : null}
                  </p>
                </div>

                {/* Button */}
                <div className="text-center space-x-3 my-5">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    className="bg-blue-300 py-2 rounded text-white px-10"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="bg-red-300 py-2 rounded text-white px-10"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </Modal>
    </div>
  );
};

export default ModalProduct;
