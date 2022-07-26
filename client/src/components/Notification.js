import React from "react";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return (
    <div>
      <p className="msgStyle">{message}</p>
    </div>
  );
};

export default Notification;
