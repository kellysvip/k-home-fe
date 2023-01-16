import { Paper } from "@mui/material";
import React from "react";
import { FSelect } from "../form";

function ProductSort() {
  return (
      <FSelect
        name="sortBy"
        label="Sort By"
        size="small"
        sx={{ minWidth: 200, maxWidth: {md: "200px"} }}
      >
        {[
          { value: "", label: "" },
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
  );
}

export default ProductSort;
