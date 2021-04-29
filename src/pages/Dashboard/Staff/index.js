import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { axios } from "../../../utils/api/shopping";
import ModalStaff from "./ModalStaff";
import ListStaff from "./ListStaff";
import WithAuth from "../../../components/WithAuth";
import Pagination from "../../../components/Pagination";

const StaffDashboard = () => {
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [listStaff, setListStaff] = useState(null);

  const onChangePage = (payload) => {
    setPage(payload);
  };

  useEffect(() => {
    const token = Cookie.get("token");
    axios
      .get("/auth/user/1/all", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setListStaff(res.data);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.status, err.response.data?.Error);
        }
      });
  }, []);

  return (
    <div className="w-full p-5">
      <div className="flex space-x-3 mb-5 items-center">
        <p className="text-3xl font-serif">Member </p>
        <ModalStaff />
      </div>
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
