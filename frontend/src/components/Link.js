import React from "react";
import { Link as RouterLink } from "react-router-dom";

const Link = ({ to, className = "", children, onClick }) => {
  return (
    <RouterLink to={to} className={className} onClick={onClick}>
      {children}
    </RouterLink>
  );
};

export default Link;
