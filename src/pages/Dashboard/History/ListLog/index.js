import React from "react";

const ListLog = (props) => {
  return (
    <tr className="text-center bg-white">
      <td className="py-2 px-2">{props.logs.id}</td>
      <td className="py-2 px-2">{props.logs.createdAt}</td>
      <td className="py-2 px-2">{props.logs.User?.email}</td>
      <td className="py-2 px-2">{props.logs.eventType}</td>
      <td className="py-2 px-2">{props.logs.type}</td>
      <td className="py-2 px-2">{props.logs.description}</td>
    </tr>
  );
};

export default ListLog;
