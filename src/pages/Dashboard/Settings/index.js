import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";

const InitialValues = {
  storename: "",
};

const SettingDashboard = () => {
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
            setTimeout(() => {
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
                <label>Open / Close</label>
              </div>
              <div className="w-full flex items-center">
                <div className="w-1/4">
                  <label className="text-lg" htmlFor="storename">
                    StoreName
                  </label>
                </div>
                <input
                  className="p-2 w-1/3 rounded-full"
                  type="text"
                  name="storename"
                  id="storename"
                  value={values.storename}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-10">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-400 p-2 text-white rounded-md"
                >
                  Save Settings
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SettingDashboard;
