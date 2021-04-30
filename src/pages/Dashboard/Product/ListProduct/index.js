import React, { useState } from "react";
import Image from "next/image";
import Cookie from "js-cookie";
import { Formik } from "formik";
import LoadingButton from "../../../../components/LoadingButton";
import { axios } from "../../../../utils/api/shopping";
import * as Yup from "yup";

const ListProduct = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showMessage, setMessage] = useState("");

  return (
    <tr className="text-center hover:bg-gray-200 bg-white">
      <td className="py-4 px-2 border-b">{props.products.id}</td>
      <td className="px-2 py-2 border-b">
        <div className="flex justify-center">
          <div className="flex justify-center w-16 h-16 rounded-full overflow-hidden">
            <Image
              src={props.products.imageSrc || "/images/no-photos.png"}
              width={64}
              height={64}
            />
          </div>
        </div>
      </td>
      <td className="py-4 px-2 border-b text-left">{props.products.name}</td>
      <td className="py-4 px-2  border-b">{props.products.price}</td>
      <td className="py-4 px-2 border-b">
        {props.products.isActive ? (
          <p className="text-green-500">Active</p>
        ) : (
          <p className="text-red-400">Inactive</p>
        )}
      </td>
      <td className="py-4 px-2 border-b">{props.products.quantity}</td>
      <td className="py-4 px-2 border-b">{props.products.Category?.name}</td>
      <td className="py-4 px-2 border-b">
        <Formik
          initialValues={{ stock: 0 }}
          validationSchema={Yup.object().shape({
            stock: Yup.number().min(0, "Min Stock is 0"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            const token = Cookie.get("token");
            setTimeout(() => {
              if (values.stock > 0) {
                setIsLoading(false);
                axios
                  .post(
                    "/db_stock/stock",
                    { productId: props.products.id, quantity: values.stock },
                    { headers: { authorization: `Bearer ${token}` } }
                  )
                  .then(() => {
                    setIsLoading(true);
                    setMessage("Add Stock Success");
                  })
                  .catch((err) => {
                    setIsLoading(true);
                    setMessage("Failure Try again!!");
                  });
              }
              setSubmitting(false);
            }, 500);
          }}
        >
          {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              {isLoading || showMessage ? (
                showMessage ? (
                  showMessage
                ) : (
                  <div className="flex justify-center items-center">
                    <button
                      className="bg-red-300 p-2 rounded-md"
                      disabled={isSubmitting}
                    >
                      Add
                    </button>
                    <input
                      name="stock"
                      className="border rounded-md p-2 outline-none w-20 mx-3"
                      type="number"
                      value={values.stock}
                      onChange={handleChange}
                    />
                    <p className="text-sm">Unit</p>
                  </div>
                )
              ) : (
                <div className="flex justify-center items-center">
                  <LoadingButton />
                </div>
              )}
            </form>
          )}
        </Formik>
      </td>
    </tr>
  );
};

export default ListProduct;
