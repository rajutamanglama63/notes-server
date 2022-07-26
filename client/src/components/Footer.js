import React from "react";

const Footer = () => {
  let footerStyle = {
    color: "purple",
    fontFamily: "monospace",
    fontWeight: "bolder",
  };

  if (true) {
    footerStyle = { ...footerStyle, color: "green" };
  }
  return (
    <div>
      <br />
      <p style={footerStyle}>TEJ center, 2022</p>
    </div>
  );
};

export default Footer;
