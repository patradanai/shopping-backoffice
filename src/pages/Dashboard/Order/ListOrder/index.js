import React from "react";
import moment from "moment";

const ListOrder = (props) => {
  return (
    <tr
      className="bg-white text-center hover:bg-blue-400 cursor-pointer"
      onClick={() => props.handleClick(props.order)}
    >
      <td className="py-4 px-2 border-b">#{props.order?.id}</td>
      <td className="py-4 px-2 border-b">{props.order?.orderStatus}</td>
      <td className="py-4 px-2 border-b uppercase">{props.order.name}</td>
      <td className="py-4 px-2 border-b">{props.order?.Payment?.name}</td>
      <td className="py-4 px-2 border-b">{props.order?.grandTotal}</td>
      <td className="py-4 px-2 border-b">{props.order?.shippingAddress}</td>
      <td className="py-4 px-2 border-b">
        {moment(props.order.createdAt).format("MMM-DD-YYYY hh:mm")}
      </td>
    </tr>
  );
};

export default ListOrder;
