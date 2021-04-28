import React, { useEffect } from "react";
import { axios } from "../../../utils/api/shopping";
import ModalStaff from "../../../components/ModalStaff";
const StaffDashboard = () => {
  useEffect(() => {
    axios
      .get("/auth/user/1/all", { Headers: {} })
      .then((res) => {
        console.log(res);
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
            <tr className="bg-white h-10">
              <th></th>
              <th>Image</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Role</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
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
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffDashboard;
