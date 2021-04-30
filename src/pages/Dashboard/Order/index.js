import React, { useContext, useEffect, useState } from "react";
import WithAuth from "../../../components/WithAuth";
import { Context } from "../../../context/Dashboard.reducer";
import Cookie, { set } from "js-cookie";
import { axios } from "../../../utils/api/shopping";
import Pagination from "../../../components/Pagination";
import ModalOrder from "./ModalOrder";
import ListOrder from "./ListOrder";

const OrderDashboard = () => {
  const [fetchStatus, setFetchStatus] = useState(true);
  const [order, setOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [orderClick, setOrderClick] = useState(null);
  const context = useContext(Context);
  const [page, setPage] = useState(1);

  const onChangePage = (payload) => {
    setPage(payload);
  };

  const onClickTable = (order) => {
    setIsModal(true);
    setOrderClick(order);
  };

  const onChangeModal = () => {
    setIsModal(false);
  };

  const fetchOrderStatus = ({ orderId, status, tracking }) => {
    const token = Cookie.get("token");
    if (context.state.shopDetails.shopId) {
      setFetchStatus(false);
      axios
        .put(
          `/db_order/${context.state.shopDetails.shopId}/edit/${orderId}`,
          { status: status, tracking: tracking },
          { headers: { authorization: `Bearer ${token}` } }
        )
        .then(() => {
          isModal(false);
          setFetchStatus(true);
        })
        .catch(() => {
          setFetchStatus(true);
        });
    }
  };

  useEffect(() => {
    const token = Cookie.get("token");

    if (context.state.shopDetails.shopId) {
      axios
        .get(`/db_order/${context.state.shopDetails.shopId}/orders`, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setOrder(res.data?.order);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get("/db_order/statusOrder", {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data);
          setOrderStatus(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div className="w-full p-5">
      <div className="flex space-x-3 mb-5">
        <p className="text-3xl font-serif">Orders</p>
        <ModalOrder
          order={orderClick}
          isModal={isModal}
          onModal={onChangeModal}
          orderStatus={orderStatus}
          fetchStatus={fetchOrderStatus}
        />
      </div>
      <div className="w-full">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-white h-10 border-b">
              <th>Order</th>
              <th>Status</th>
              <th>Name</th>
              <th>Gateway</th>
              <th>Amount</th>
              <th>Shipping</th>
              <th>Date</th>
            </tr>
          </thead>
          {order?.length ? (
            order?.map((data, index) => (
              <tbody key={index}>
                <ListOrder order={data} handleClick={onClickTable} />
              </tbody>
            ))
          ) : (
            <tbody>
              <tr>
                <td colSpan={6}>
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

export default WithAuth(OrderDashboard);
