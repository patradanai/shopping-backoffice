import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../../context/Dashboard.reducer";
import Cookie from "js-cookie";
import { axios } from "../../../utils/api/shopping";
import ModalProduct from "./ModalProduct";
import ListProduct from "./ListProduct";
import WithAuth from "../../../components/WithAuth";
import Pagination from "../../../components/Pagination";
import RefreshIcon from "../../../components/icons/Refresh";
import Loading from "../../../components/Loading";

const ProductDashboard = () => {
  const [isLoading, setIsloading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [productModal, setProductModal] = useState(null);
  const context = useContext(Context);
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState(null);
  const token = Cookie.get("token");

  const onChangePage = (payload) => {
    setPage(payload);
  };

  const onChangeModal = (state) => {
    setIsModal(!state);
  };

  const onClickProduct = (product) => {
    setProductModal(product);
    setIsModal(true);
  };

  /**
   *  Fetch all shop's product
   */
  const fetchProducts = () => {
    if (context.state.shopDetails?.shopId) {
      setIsloading(true);
      setTimeout(() => {
        axios
          .get(`/db_product/${context.state.shopDetails?.shopId}/products`, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            const newSort = res.data?.data.sort((a, b) => b.id - a.id);
            setProducts(res.data.data);
          })
          .then(() => {
            setIsloading(false);
          })
          .catch((err) => {
            setIsloading(false);
            if (err.response) {
              console.log(err.response.status, err.response.data?.Error);
            }
          });
      }, 500);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [context.state.shopDetails?.shopId]);

  return (
    <div className="w-full p-5">
      {/* Loading */}
      {isLoading ? <Loading /> : null}

      {/* Header Title */}
      <div className="flex space-x-3 mb-5 items-center">
        <p className="text-3xl font-serif">Products</p>
        <ModalProduct
          token={token}
          onChangeModal={onChangeModal}
          onCompleted={() => fetchProducts()}
          stateModal={isModal}
          onClickProduct={() => onClickProduct()}
          product={productModal}
        />
        <div className="flex-grow flex items-center">
          <button
            className="ml-auto bg-white shadow-md p-2  border border-gray-300 rounded-full flex space-x-3 cursor-pointer hover:text-red-400"
            onClick={() => fetchProducts()}
          >
            <RefreshIcon className="w-6 h-6" />
            <p>Refresh</p>
          </button>
        </div>
      </div>
      <div className="w-full">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-white h-10 border-b text-center">
              <th className="p-2">Id</th>
              <th className="p-2">Image</th>
              <th className="p-2 w-1/4 text-left">Name</th>
              <th className="p-2">Price</th>
              <th className="p-2">Status</th>
              <th className="p-2">Remain</th>
              <th className="p-2">Category</th>
              <th className="p-2 w-1/4">Update Inventory</th>
            </tr>
          </thead>
          {products?.length > 0 ? (
            <tbody>
              {products?.map((data, index) => (
                <ListProduct
                  products={data}
                  key={index}
                  token={token}
                  onClickProduct={(product) => onClickProduct(product)}
                  onCompleted={() => fetchProducts()}
                />
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={8}>
                  <div className="text-center mt-20 text-lg font-mono">
                    There is nothing here.
                  </div>
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
      <div className="flex  w-full justify-between  mt-1">
        <p>Showing 1 of 1 of 1 entries</p>
        <Pagination
          allCounter={10}
          counter={5}
          onChangeCounter={onChangePage}
          focusCounter={page}
        />
      </div>
    </div>
  );
};

export default WithAuth(ProductDashboard);
