import React, { useState, useContext, useEffect } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import Cookie from "js-cookie";
import LoadingButton from "../../../components/LoadingButton";
import { Context } from "../../../context/Dashboard.reducer";
import { axios } from "../../../utils/api/shopping";
import Toggle from "../../../components/Toggle";
import WithAuth from "../../../components/WithAuth";

const SettingDashboard = () => {
  const context = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [showMessage, setShowMessage] = useState("");
  const [stateToggle, setStateToggle] = useState(
    context.state.shopDetails?.isActive
  );
  const InitialValues = {
    storename: context.state.shopDetails?.shopName || "",
  };

  const handleToggle = (state) => {
    setStateToggle(state);
  };

  return (
    <div className="p-5">
      <p className="text-3xl font-serif">Settings</p>
      <div className="mt-10">
        <Formik
          initialValues={InitialValues}
          validationSchema={Yup.object().shape({
            storename: Yup.string().required(),
          })}
          onSubmit={(values, { setSubmitting }) => {
            const token = Cookie.get("token");
            setIsLoading(false);
            setTimeout(() => {
              if (context.state.shopDetails.shopId) {
                axios
                  .put(
                    `/db_shop/shop/${context.state.shopDetails?.shopId}/edit`,
                    {
                      isActiveShop: stateToggle,
                      name: values.storename,
                    },
                    { headers: { authorization: `Bearer ${token}` } }
                  )
                  .then((res) => {
                    setIsLoading(true);
                    setShowMessage("Update Success");
                  })
                  .catch((err) => {
                    setIsLoading(true);
                    setShowMessage("Found Problem Try Again!!!!");
                    console.log(err);
                  });
              }
              setSubmitting(false);
            }, 300);
          }}
        >
          {({ values, errors, handleSubmit, handleChange, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <div className="w-full mb-5 flex items-center">
                <div className="w-1/4">
                  <label className="text-lg" htmlFor="storename">
                    StoreStatus
                  </label>
                </div>
                <Toggle state={stateToggle} onChangeToggle={handleToggle} />
              </div>
              <div className="w-full flex items-center">
                <div className="w-1/4">
                  <label className="text-lg" htmlFor="storename">
                    StoreName
                  </label>
                </div>
                <input
                  className="py-2 px-4 w-1/3 rounded-full"
                  type="text"
                  name="storename"
                  id="storename"
                  value={values.storename}
                  onChange={handleChange}
                />
              </div>
              {/* Button */}
              {isLoading ? (
                <div className="flex items-center mt-10">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-400 p-2 text-white rounded-md"
                  >
                    Save Settings
                  </button>
                  <p className="ml-5 text-sm text-red-500">
                    {showMessage ? showMessage : null}
                  </p>
                </div>
              ) : (
                <div className="flex items-center my-10 ml-10">
                  <LoadingButton />
                </div>
              )}
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default WithAuth(SettingDashboard);
