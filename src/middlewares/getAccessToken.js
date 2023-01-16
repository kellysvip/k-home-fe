import Cookies from "js-cookie";
import React from "react";
import apiService from "../app/apiService";

export const getAccessToken = () => {
  if (Cookies.get("accessToken"))
    return (apiService.defaults.headers.common.Authorization = `Bearer ${Cookies.get(
      "accessToken"
    )}`); 
  return;
};
