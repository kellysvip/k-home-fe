import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import "./ButtonFind.css";
const ButtonFind = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate("/");
  const handleClick = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else navigate("/");
  };

  return (
    <button className="find-btn" onClick={handleClick}>
      <span className="find-btn-line"> </span>
      <span className="find-btn-line"> </span>
      <span className="find-btn-line"> </span>
      <span className="find-btn-line"> </span>
      find now
    </button>
  );
};

export default ButtonFind;
