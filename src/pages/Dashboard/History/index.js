import React, { useEffect, useState, useContext } from "react";
import Cookie from "js-cookie";
import { Context } from "../../../context/Dashboard.reducer";
import WithAuth from "../../../components/WithAuth";
import { axios } from "../../../utils/api/shopping";
import ListLog from "./ListLog";

const HistoryDashboard = () => {
  const context = useContext(Context);
  const [Logs, setLogs] = useState(null);

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
      <div className="w-full">
        <table className="w-full table-auto">
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
    </div>
  );
};

export default WithAuth(HistoryDashboard);
