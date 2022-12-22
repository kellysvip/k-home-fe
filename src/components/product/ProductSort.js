import { Paper } from "@mui/material";
import React from "react";
import { FSelect } from "../form";

function ProductSort() {
  return (
    <Paper elevation={10}>
      <FSelect name="sortBy" label="Sort By" size="small" sx={{ width: 300 }}>
      {[
        { value: "featured", label: "Featured" },
        { value: "newest", label: "Newest" },
        { value: "priceDesc", label: "Price: High-Low" },
        { value: "priceAsc", label: "Price: Low-High" },
      ].map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </FSelect>
    </Paper>
  );
}

export default ProductSort;