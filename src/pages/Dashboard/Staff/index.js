import React, { useEffect, useState, useContext } from "react";
import Cookie from "js-cookie";
import { Context } from "../../../context/Dashboard.reducer";
import { axios } from "../../../utils/api/shopping";
import ModalStaff from "./ModalStaff";
import ListStaff from "./ListStaff";
import WithAuth from "../../../components/WithAuth";
import Pagination from "../../../components/Pagination";
import RefreshIcon from "../../../components/icons/Refresh";
import Loading from "../../../components/Loading";

const StaffDashboard = () => {
  const context = useContext(Context);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [listStaff, setListStaff] = useState(null);

  const onChangePage = (payload) => {
    setPage(payload);
  };

  // Fetching Member in Shop
  const fetchingMember = () => {
    const token = Cookie.get("token");
    if (token && context.state.shopDetails?.shopId) {
      setLoading(true);
      setTimeout(() => {
        axios
          .get(`/auth/user/${context.state.shopDetails?.shopId}/all`, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setListStaff(res.data);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            if (err.response) {
              console.log(err.response.status, err.response.data?.Error);
            }
          });
      }, 500);
    }
  };

  useEffect(() => {
    fetchingMember();
  }, [context.state.shopDetails?.shopId]);

  return (
    <div className="w-full p-5">
      {/* Loading */}
      {isLoading ? <Loading /> : null}

      {/* Header Title and Button */}
      <div className="flex space-x-3 mb-5 items-center">
        <p className="text-3xl font-serif">Member </p>
        <ModalStaff onCompleted={() => fetchingMember()} />
        <div className="flex-grow flex items-center">
          <button
            className="ml-auto p-2 bg-white shadow-md border border-gray-300 rounded-full flex space-x-3 cursor-pointer hover:text-red-400"
            onClick={() => fetchingMember()}
          >
            <RefreshIcon className="w-6 h-6" />
            <p>Refresh</p>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="w-full">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-white h-10 border-b">
              <th>Id</th>
              <th>Image</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Role</th>
              <th className="text-left">Email</th>
              <th>Phone</th>
              <th>Status</th>
            </tr>
          </thead>
          {listStaff?.length > 0 ? (
            <tbody>
              {listStaff?.map((staff, index) => (
                <ListStaff staff={staff} key={index} />
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={8}>
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

export default WithAuth(StaffDashboard);
