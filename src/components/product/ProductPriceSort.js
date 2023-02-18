import React from "react";
import { FSelect } from "../form";

function ProductPriceSort() {
  return (
      <FSelect
        name="price"
        label="Price"
        size="small"
        sx={{ minWidth: 200, display: {md: "flex", sm: "none"}, maxWidth: {md: "200px"}, mr: 3 }}
      >
        {[
          { value: "", label: "" },
          { value: "price1", label: "Below 3 milion Dong" },
          { value: "price2", label: "Between 3 - 5 milion Dong" },
          { value: "price3", label: "Above 5 milion Dong" },
          
        ].map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </FSelect>
  );
}

export default ProductPriceSort;
