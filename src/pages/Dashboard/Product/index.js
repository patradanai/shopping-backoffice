import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../../context/Dashboard.reducer";
import Cookie from "js-cookie";
import { axios } from "../../../utils/api/shopping";
import ModalProduct from "./ModalProduct";
import ListProduct from "./ListProduct";
import WithAuth from "../../../components/WithAuth";

const ProductDashboard = () => {
  const context = useContext(Context);
  const [products, setProducts] = useState(null);
  const token = Cookie.get("token");
  /**
   *  Fetch all shop's product
   */
  useEffect(() => {
    if (context.state.shopDetails?.shopId) {
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
        .catch((err) => {
          if (err.response) {
            console.log(err.response.status, err.response.data?.Error);
          }
        });
    }
  }, []);

  return (
    <div className="w-full p-5">
      <div className="flex space-x-3 mb-5 items-center">
        <p className="text-3xl font-serif">Products</p>
        <ModalProduct token={token} />
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
                <ListProduct products={data} key={index} token={token} />
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
    </div>
  );
};

export default WithAuth(ProductDashboard);
