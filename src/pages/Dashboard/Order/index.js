import React, { useContext, useEffect, useState } from "react";
import WithAuth from "../../../components/WithAuth";
import { Context } from "../../../context/Dashboard.reducer";
import Cookie, { set } from "js-cookie";
import { axios } from "../../../utils/api/shopping";
import Pagination from "../../../components/Pagination";
import ModalOrder from "./ModalOrder";
import ListOrder from "./ListOrder";
import RefreshIcon from "../../../components/icons/Refresh";
import Loading from "../../../components/Loading/";
import _ from "lodash";

const OrderDashboard = () => {
  const [isLoading, setIsloading] = useState(false);
  const [fetchStatus, setFetchStatus] = useState(true);
  const [order, setOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);
  const [filter, setFilter] = useState([]);
  const [select, setSelect] = useState("");
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

  const onSelect = (e) => {
    setSelect(e.target.value);
    const filter = _.filter(
      order,
      (data) => !e.target.value || (data && data.status === e.target.value)
    );
    setFilter(filter);
  };

  // Fetch OrderStatus
  const postOrderStatus = ({ orderId, status, tracking, statusName }) => {
    const token = Cookie.get("token");
    if (context.state.shopDetails.shopId) {
      setFetchStatus(false);
      axios
        .put(
          `/db_order/${context.state.shopDetails?.shopId}/order/${orderId}/edit`,
          { statusId: status, tracking: tracking, status: statusName },
          { headers: { authorization: `Bearer ${token}` } }
        )
        .then(() => {
          setIsModal(false);
          setFetchStatus(true);
          // fetching Order
          fetchOrder();
        })
        .catch((err) => {
          console.log(err);
          setFetchStatus(true);
        });
    }
  };

  // Fetch Order //
  const fetchOrder = () => {
    const token = Cookie.get("token");

    if (context.state.shopDetails?.shopId) {
      setIsloading(true);
      setTimeout(() => {
        axios
          .get(`/db_order/${context.state.shopDetails.shopId}/orders`, {
            headers: { authorization: `Bearer ${token}` },
          })
          .then((res) => {
            setOrder(res.data?.order);
            axios
              .get("/db_order/statusOrder", {
                headers: { authorization: `Bearer ${token}` },
              })
              .then((res) => {
                setOrderStatus(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .then(() => {
            setIsloading(false);
          })
          .catch((err) => {
            console.log(err);
            setIsloading(false);
          });
      }, 500);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [context.state.shopDetails?.shopId]);

  return (
    <div className="w-full p-5">
      {/* Loading */}
      {isLoading ? <Loading /> : null}

      {/* Header Title */}
      <div className="flex space-x-3 mb-5">
        <p className="text-3xl font-serif">Orders</p>
        <ModalOrder
          order={orderClick}
          isModal={isModal}
          onModal={() => onChangeModal()}
          orderStatus={orderStatus}
          fetchStatus={(e) => postOrderStatus(e)}
        />
        <div className="flex-grow flex items-center">
          <button
            className="ml-auto  p-2 bg-white shadow-md border border-gray-300 rounded-full flex space-x-3 cursor-pointer hover:text-red-400"
            onClick={() => fetchOrder()}
          >
            <RefreshIcon className="w-6 h-6" />
            <p>Refresh</p>
          </button>
        </div>
      </div>

      <div className="mb-2">
        <select className="w-30" value={select} onChange={onSelect}>
          <option value="">All</option>
          {orderStatus?.map((data, index) => (
            <option value={data.name} key={index}>
              {data.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
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
            filter?.map((data, index) => (
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

      {/* Pagination */}
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
