import React from "react";
import moment from "moment";

const ListOrder = (props) => {
  return (
    <tr
      className="bg-white text-center hover:bg-blue-400 cursor-pointer"
      onClick={() => props.handleClick(props.order)}
    >
      <td className="py-4 px-2 border-b">{props.order.id}</td>
      <td className="py-4 px-2 border-b">{props.order.orderStatus}</td>
      <td className="py-4 px-2 border-b uppercase">
        {props.order.User?.fname + " " + props.order.User?.lname}
      </td>
      <td className="py-4 px-2 border-b"></td>
      <td className="py-4 px-2 border-b"></td>
      <td className="py-4 px-2 border-b"></td>
      <td className="py-4 px-2 border-b">
        {moment(props.order.createdAt).format("YYYY-mm-ddd")}
      </td>
    </tr>
  );
};

export default ListOrder;
