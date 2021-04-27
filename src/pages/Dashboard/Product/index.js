import React from "react";

const ProductDashboard = () => {
  return (
    <div className="w-full p-5">
      <div className="flex space-x-3 mb-5">
        <p className="text-3xl font-serif">Products</p>
        <button className="bg-red-300 rounded px-3 py-1 text-white">
          Add Product
        </button>
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
