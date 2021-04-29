import React from "react";
import Image from "next/image";
const ListStaff = (props) => {
  return (
    <tr className="text-center hover:bg-gray-200 bg-white">
      <td className="py-4 px-2 border-b">{props.staff.id}</td>
      <td className="py-2 px-2 border-b">
        <div className="flex justify-center ">
          <div className="flex justify-center w-16 h-16 rounded-full overflow-hidden">
            <Image src={"/images/avatar.png"} width={64} height={64} />
          </div>
        </div>
      </td>
      <td className="py-4 px-2 border-b">{props.staff.fname}</td>
      <td className="py-4 px-2 border-b">{props.staff.lname}</td>
      <td className="py-4 px-2 border-b">{props.staff.Roles[0]?.role}</td>
      <td className="text-left py-4 px-2 border-b">{props.staff.email}</td>
      <td className="py-4 px-2 border-b">{props.staff.phone}</td>
      <td className="py-4 px-2 border-b">
        {props.staff.isActive ? (
          <p className="text-green-500">Active</p>
        ) : (
          <p className="text-red-400">Inactive</p>
        )}
      </td>
    </tr>
  );
};

export default ListStaff;
