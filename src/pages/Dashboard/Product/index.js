import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { axios } from "../../../utils/api/shopping";
import ModalProduct from "./ModalProduct";
import ListProduct from "./ListProduct";
const ProductDashboard = () => {
  const [products, setProducts] = useState(null);
  const token = Cookie.get("token");
  /**
   *  Fetch all shop's product
   */
  useEffect(() => {
    axios
      .get("/db_product/1/products", {
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
          <tbody>
            {products?.map((data, index) => (
              <ListProduct products={data} key={index} token={token} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductDashboard;
