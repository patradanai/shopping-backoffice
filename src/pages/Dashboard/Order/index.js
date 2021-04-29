import React, { useContext, useEffect, useState } from "react";
import WithAuth from "../../../components/WithAuth";
import { Context } from "../../../context/Dashboard.reducer";
import Cookie from "js-cookie";
import { axios } from "../../../utils/api/shopping";
import Pagination from "../../../components/Pagination";

const OrderDashboard = () => {
  const [page, setPage] = useState(1);

  const onChangePage = (payload) => {
    setPage(payload);
  };

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
          <tbody></tbody>
          <tbody>
            <tr>
              <td colSpan={6}>
                <div className="text-center mt-20 text-lg font-mono">
                  There is nothing here.
                </div>
              </td>
            </tr>
          </tbody>
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

export default WithAuth(OrderDashboard);
