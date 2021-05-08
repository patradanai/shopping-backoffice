import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Modal from "react-modal";
import ListProduct from "../ListProduct";
import { axios } from "../../../../utils/api/shopping";

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

const ModalOrder = (props) => {
  const [shippingMethod, setShippingMethod] = useState(null);

  useEffect(() => {
    axios
      .get("/db_shipping/shippings")
      .then((res) => {
        setShippingMethod(res.data);
      })
      .catch((err) => console.log(err));
  }, [props.order?.ShippingMethodId]);

  return (
    <div>
      <Modal isOpen={props.isModal} style={customStyles} ariaHideApp={false}>
        <div style={{ width: 620 }}>
          <Formik
            initialValues={{ status: props.order?.status || "", tracking: "" }}
            validationSchema={Yup.object().shape({
              status: Yup.string().required("Please Select Status"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              const orderStatus = props?.orderStatus?.filter(
                (data) => data.name === values.status
              );

              setTimeout(() => {
                props.fetchStatus({
                  orderId: props.order?.id,
                  status: orderStatus[0]?.id,
                  tracking: values.tracking,
                  statusName: orderStatus[0]?.name,
                });
                setSubmitting(false);
              }, 300);
            }}
          >
            {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                {/* Header form */}
                <div className="bg-blue-300 h-10 p-2 text-center">
                  <p className="text-white font-mono">Order Number #1</p>
                </div>
                <div className="px-10 mt-5">
                  {/* Name */}
                  <div className="mb-5">
                    <p className="line font-mono text-yellow-500 mb-1">Name</p>
                    <p className="uppercase t">{props.order?.name}</p>
                  </div>

                  {/* Shipping */}
                  <div className="mb-5">
                    <p className="line font-mono text-yellow-500 mb-1">
                      Shipping
                    </p>
                    <p>{props.order?.shippingAddress}</p>
                  </div>

                  {/* Items */}
                  <div className="mb-5">
                    <p className="line font-mono text-yellow-500 mb-1">
                      Products
                    </p>
                    <div className="max-h-40 overflow-y-auto">
                      {props.order?.Products?.map((data, index) => (
                        <ListProduct product={data} key={index} id={index} />
                      ))}
                    </div>
                  </div>
                  {/* Total */}
                  <div className="mb-5">
                    <p className="line font-mono text-yellow-500 mb-1">Total</p>
                    <div className="flex justify-end items-center">
                      <p>
                        ค่าขนส่ง
                        <span className="text-sm text-red-400 mx-2">
                          {shippingMethod[props.order?.ShippingMethodId].name} +
                          {shippingMethod[props.order?.ShippingMethodId].price}
                        </span>
                      </p>

                      <p>รวม</p>
                      <div
                        className="border p-2 rounded h-8 ml-2 flex items-center"
                        style={{ minWidth: 50 }}
                      >
                        <p>{props.order?.grandTotal}</p>
                      </div>
                    </div>
                  </div>

                  {/* Staff Action */}
                  <div className="mb-5">
                    <p className="line font-mono text-yellow-500 mb-1">
                      Action
                    </p>
                    <div className="flex justify-between">
                      <div>
                        <select
                          className="border rounded p-2"
                          name="status"
                          value={values.status}
                          onChange={handleChange}
                        >
                          <option value="">Select Status</option>
                          {props.orderStatus?.map((data, index) => (
                            <option value={data.name} key={index}>
                              {data.name}
                            </option>
                          ))}
                        </select>
                        <p className="text-sm text-red-300">
                          {errors.status ? errors.status : null}
                        </p>
                      </div>
                      {values.status == "Delivery" ? (
                        <div className="flex items-center">
                          <p className="text-sm mr-2">Tracking Number : </p>
                          <input
                            className="border rounded p-2"
                            name="tracking"
                            value={values.tracking}
                            onChange={handleChange}
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>

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
                      onClick={() => props.onModal()}
                      className="bg-red-300 py-2 rounded text-white px-10 hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </Modal>
      <style jsx>{`
        .line {
          display: flex;
          align-items: center;
        }

        .line::before {
        }

        .line::after {
          content: "";
          flex: 1;
          border-bottom: 1px solid #000;
        }
      `}</style>
    </div>
  );
};

export default ModalOrder;
