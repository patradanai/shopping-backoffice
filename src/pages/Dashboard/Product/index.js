import React from "react";
import ModalProduct from "../../../components/ModalProduct";
const ProductDashboard = () => {
  return (
    <div className="w-full p-5">
      <div className="flex space-x-3 mb-5 items-center">
        <p className="text-3xl font-serif">Products</p>
        <ModalProduct />
      </div>
      <div className="w-full">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-white h-10">
              <th></th>
              <th>Image</th>
              <th>Name</th>
              <th>Status</th>
              <th>Remain</th>
              <th>Update Inventory</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductDashboard;
