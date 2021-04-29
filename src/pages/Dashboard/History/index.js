import React, { useEffect, useState, useContext } from "react";
import Cookie from "js-cookie";
import { Context } from "../../../context/Dashboard.reducer";
import WithAuth from "../../../components/WithAuth";
import { axios } from "../../../utils/api/shopping";
import ListLog from "./ListLog";
import Pagination from "../../../components/Pagination";

const HistoryDashboard = () => {
  const context = useContext(Context);
  const [page, setPage] = useState(1);
  const [Logs, setLogs] = useState(null);

  const onChangePage = (payload) => {
    setPage(payload);
  };

  useEffect(() => {
    const token = Cookie.get("token");
    axios
      .get(`/db_log/logs/${context.state.shopDetails.shopId}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setLogs(res.data?.logs);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="w-full p-5">
      <div className="flex space-x-3 mb-5">
        <p className="text-3xl font-serif">Logs</p>
      </div>
      <div className="w-full h-full">
        <table className="w-full h-full table-auto">
          <thead>
            <tr className="bg-white h-10 border-b text-center">
              <th>Id</th>
              <th>Date</th>
              <th>User</th>
              <th>Object</th>
              <th>Event</th>
              <th>Description</th>
            </tr>
          </thead>
          {Logs?.length > 0 ? (
            <tbody>
              {Logs?.map((data, index) => (
                <ListLog logs={data} key={index} />
              ))}
            </tbody>
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

export default WithAuth(HistoryDashboard);
