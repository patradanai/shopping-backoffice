import React from "react";

const ListLog = (props) => {
  return (
    <tr>
      <td>{props.logs.id}</td>
      <td>{props.logs.createdAt}</td>
      <td>{props.logs.User?.email}</td>
      <td>{props.logs.eventType}</td>
      <td>{props.logs.type}</td>
      <td>{props.logs.description}</td>
    </tr>
  );
};

export default ListLog;
