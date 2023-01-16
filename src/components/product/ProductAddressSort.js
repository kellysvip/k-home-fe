import { Paper } from "@mui/material";
import React from "react";
import { FSelect } from "../form";

function ProductAddressSort() {
  return (
      <FSelect
        name="address"
        label="Address"
        size="small"
        sx={{  display: {md: "flex", sm: "none"}, maxWidth: {md: "200px"}, mr: 3}}
      >
        {[
          { value: "", label: "" },
          { value: "District 1", label: "District 1" },
          { value: "District 2", label: "District 2" },
          { value: "District 3", label: "District 3" },
          { value: "District 4", label: "District 4" },
          { value: "District 5", label: "District 5" },
          { value: "District 6", label: "District 6" },
          { value: "District 7", label: "District 7" },
          { value: "District 8", label: "District 8" },
          { value: "District 9", label: "District 9" },
          { value: "District 10", label: "District 10" },
          { value: "District 11", label: "District 11" },
          { value: "District 12", label: "District 12" },
          { value: "Binh Tan Distric", label: "Binh Tan District" },
          { value: "Binh Thanh District", label: "Binh Thanh District" },
          { value: "Go Vap District", label: "Go Vap District" },
          { value: "Phu Nhuan District", label: "Phu Nhuan District" },
          { value: "Tan Binh District", label: "Tan Binh District" },
          { value: "Tan Phu District", label: "Tan Phu District" },
          { value: "Thu Duc City", label: "Thu Duc City" },
        ].map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </FSelect>
  );
}

export default ProductAddressSort;
