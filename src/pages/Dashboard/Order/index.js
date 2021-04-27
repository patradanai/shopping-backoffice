import React from "react";

const OrderDashboard = () => {
  return (
    <div className="w-full p-5">
      <div className="flex space-x-3 mb-5">
        <p className="text-3xl font-serif">Orders</p>
        <button className="bg-red-300 rounded px-3 py-1 text-white">
          Add Order
        </button>
      </div>
      <div className="w-full">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-white h-10">
              <th></th>
              <th>Order</th>
              <th>Date</th>
              <th>Status</th>
              <th>Shipping</th>
              <th>Action</th>
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

export default OrderDashboard;
