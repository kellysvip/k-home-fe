import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { InputAdornment, Paper } from "@mui/material";
import { FTextField } from "../form";

function ProductSearch() {
  return (
    <Paper elevation={10}>
      <FTextField
        name="searchQuery"
        sx={{ width: 300 }}
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Paper>
  );
}

export default ProductSearch;
