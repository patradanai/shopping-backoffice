import React, { useState, useEffect, useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Modal from "react-modal";
import Image from "next/image";
import { Context } from "../../../../context/Dashboard.reducer";
import Thumbnail from "../../../../components/ThumbImage";
import LoadingButton from "../../../../components/LoadingButton";
import { axios } from "../../../../utils/api/shopping";
import Toggle from "../../../../components/Toggle";

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

// Config File Type

const FILE_SIZE = 2097152;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const handleImageUpdate = (image, onUploadProgress) => {
  let fd = new FormData();
  fd.append("product", image);

  if (fd) {
    return axios.post("db_image/footage/product", fd, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }
};

const ModalProduct = ({
  token,
  onCompleted,
  stateModal,
  onChangeModal,
  onClickProduct,
  product,
}) => {
  const context = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [showMessage, setShowMessage] = useState("");
  const [file, setFile] = useState(null);
  const [isToggle, setToggle] = useState(false);
  const [category, setCategory] = useState(null);
  const [image, setImage] = useState(null);

  const initialValues = {
    name: product?.name || "",
    price: product?.price || 0,
    quantity: 0,
    description: product?.description || "",
    category: product?.Category?.id || "",
    isActive: isToggle || true,
    imageSrc: image ? image : product?.imageSrc || "",
    file: file || 0,
  };

  const handleToggle = (state) => {
    setToggle(state);
  };

  useEffect(() => {
    axios.get("/db_category/categories").then((res) => {
      setCategory(res.data?.data);
    });
  }, []);

  useEffect(() => {
    setToggle(product?.isActive);
  }, [product?.isActive]);

  return (
    <div>
      {/* Button Trigger Modal */}
      <button
        className="bg-red-300 rounded px-3 py-1 text-white"
        onClick={() => onClickProduct()}
      >
        Add Product
      </button>
      {/* Modal  */}
      <Modal isOpen={stateModal} style={customStyles} ariaHideApp={false}>
        <div style={{ width: 620 }}>
          {/* Header form */}
          <div className="bg-blue-300 h-10 p-2 text-center">
            <p className="text-white font-mono">Add Product</p>
          </div>

          {/* Form Validate */}
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Name is required"),
              price: Yup.number("Please fill number")
                .integer("Can't Minus")
                .min(0, "Minimun is 0 price")
                .required("Price is required"),
              description: Yup.string().required("Description is required"),
              file: Yup.mixed()
                .nullable()
                .notRequired()
                .test(
                  "FILE_SIZE",
                  "Uploaded file is too big.",
                  (value) => !value || (value && value.size <= FILE_SIZE)
                )
                .test(
                  "FILE_FORMAT",
                  "Uploaded file has unsupported format.",
                  (value) =>
                    !value || (value && SUPPORTED_FORMATS.includes(value.type))
                ),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setIsLoading(false);
              setTimeout(() => {
                // Fetching New Product
                if (!context.state.shopDetails?.shopId) {
                  return;
                }
                if (product) {
                  axios
                    .put(
                      `/db_product/product/${product?.id}/edit`,
                      {
                        name: values.name,
                        price: values.price,
                        isActive: values.isActive,
                        imageSrc: values.imageSrc,
                        description: values.description,
                        categoryId: values.category,
                        quanlity: values.quantity,
                      },
                      {
                        headers: {
                          authorization: `Bearer ${token}`,
                        },
                      }
                    )
                    .then((res) => {
                      setSubmitting(false);
                      onChangeModal(stateModal);
                      setIsLoading(true);

                      // Props Oncompleted
                      onCompleted();
                    })
                    .catch((err) => {
                      if (err.response) {
                        setIsLoading(true);
                        setShowMessage("Found Problem Try Again!!!!");
                        console.log(
                          err.response.status,
                          err.response.data?.Error
                        );
                      }
                    });
                } else {
                  // post Product
                  axios
                    .post(
                      `/db_product/${context.state.shopDetails?.shopId}/product`,
                      {
                        name: values.name,
                        price: values.price,
                        isActive: values.isActive,
                        imageSrc: values.imageSrc,
                        description: values.description,
                        categoryId: values.category,
                        quanlity: values.quantity,
                      },
                      {
                        headers: {
                          authorization: `Bearer ${token}`,
                        },
                      }
                    )
                    .then((res) => {
                      setSubmitting(false);
                      onChangeModal(stateModal);
                      setIsLoading(true);

                      // Props Oncompleted
                      onCompleted();
                    })
                    .catch((err) => {
                      if (err.response) {
                        setIsLoading(true);
                        setShowMessage("Found Problem Try Again!!!!");
                        console.log(
                          err.response.status,
                          err.response.data?.Error
                        );
                      }
                    });
                }
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
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit} className="px-10">
                {/* Image  */}
                <div className="flex flex-col justify-center items-center mt-3 mb-5">
                  <div className="w-32 h-32 rounded-full bg-gray-400 overflow-hidden flex items-center justify-center">
                    {/* <Thumbnail file={values.file} /> */}
                    <label htmlFor="file">
                      <Image
                        src={values.imageSrc || "/images/no-photos.png"}
                        width={128}
                        height={128}
                      />
                    </label>
                    <input
                      id="file"
                      name="file"
                      type="file"
                      className="hidden"
                      onChange={(event) => {
                        const file = event.currentTarget.files[0];
                        setFile(file);
                        setFieldValue("file", file);
                        handleImageUpdate(file).then((res) => {
                          setImage(res.data?.image);
                        });
                      }}
                    />
                  </div>
                  <p className="text-sm text-red-300">
                    {errors.file || touched.file ? errors.file : null}
                  </p>
                </div>

                {/* Product Name */}
                <div className="mb-5 flex flex-col">
                  <div className="flex">
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
                  </div>
                  <p className="text-sm text-red-300">
                    {errors.name || touched.name ? errors.name : null}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-5 flex flex-col">
                  <div className="flex">
                    <label
                      className="font-mono text-sm mb-1 mr-2"
                      htmlFor="price"
                    >
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
                  </div>
                  <p className="text-sm text-red-300">
                    {errors.price || touched.price ? errors.price : null}
                  </p>
                </div>

                {/* Category */}
                <div className="mb-5 flex flex-col">
                  <div className="flex">
                    <label
                      className="font-mono text-sm mb-1 mr-2"
                      htmlFor="price"
                    >
                      Category :
                    </label>
                    <select
                      name="category"
                      onChange={handleChange}
                      value={values.category}
                    >
                      <option value="" label="Select a Category" />
                      {category.map((payload, index) => {
                        return (
                          <option
                            value={parseInt(payload.id)}
                            key={index}
                            label={payload.name}
                          />
                        );
                      })}
                    </select>
                  </div>
                  <p className="text-sm text-red-300">
                    {errors.category || touched.category
                      ? errors.category
                      : null}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-5 flex flex-col">
                  <div className="flex items-center">
                    <label
                      className="font-mono text-sm mb-1 mr-2"
                      htmlFor="price"
                    >
                      isActive :
                    </label>
                    <Toggle state={isToggle} onChangeToggle={handleToggle} />
                  </div>
                </div>

                {/* Description */}
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
                      onClick={() => onChangeModal(stateModal)}
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

export default ModalProduct;
