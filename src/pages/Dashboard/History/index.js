import React, { useEffect, useState, useContext } from "react";
import Cookie from "js-cookie";
import { Context } from "../../../context/Dashboard.reducer";
import WithAuth from "../../../components/WithAuth";
import { axios } from "../../../utils/api/shopping";
import ListLog from "./ListLog";
import Pagination from "../../../components/Pagination";
import SerchIcon from "../../../components/icons/Search";
import _ from "lodash";
const perPage = 10;

const HistoryDashboard = () => {
  const context = useContext(Context);
  const [sliceLog, setSliceLog] = useState(null);
  const [input, setInput] = useState(null);
  const [page, setPage] = useState(0);
  const [Logs, setLogs] = useState(null);

  const onChangePage = (payload) => {
    setPage(payload);
  };

  const searchFilter = () => {
    const values = _.filter(
      Logs,
      (data) => !data || (data && data?.User.email?.indexOf(input) > -1)
    );

    if (input) {
      setSliceLog(values);
    } else {
      setPage(0);
    }
  };

  const delaySearch = _.debounce(searchFilter, 500);

  const onChnageInput = (e) => {
    setInput(e.target.value);
    delaySearch();
  };

  useEffect(() => {
    const values = Logs?.slice(perPage * page, perPage + perPage * page);
    setSliceLog(values);
  }, [page, Logs]);

  useEffect(() => {
    const token = Cookie.get("token");
    axios
      .get(`/db_log/logs/${context.state.shopDetails.shopId}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setLogs(res.data?.logs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="w-full p-5">
      <div className="flex space-x-3 mb-5 justify-between">
        <p className="text-3xl font-serif">Audit Logs</p>
        <div className="flex items-center relative">
          <SerchIcon className="w-6 h-6 text-gray-400 absolute top-1/2 right-2 transform -translate-y-1/2" />
          <input
            className="py-1 px-3 h-8 text-sm rounded-full outline-none"
            placeholder="Seach"
            onChange={onChnageInput}
            value={input}
          />
        </div>
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
              {sliceLog?.map((data, index) => (
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
        <p>
          Showing {perPage * page} to{" "}
          {perPage + perPage * page > Logs?.length
            ? Logs?.length
            : perPage + perPage * page}{" "}
          of {Logs?.length} entries
        </p>
        <Pagination
          allCounter={Logs?.length}
          counter={perPage}
          onChangeCounter={onChangePage}
          focusCounter={page}
        />
      </div>
    </div>
  );
};

export default WithAuth(HistoryDashboard);
