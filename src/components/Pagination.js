import * as React from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function PaginationCustom({ page, handleChangePage, count }) {
  
  return (
    <Stack spacing={2}>
      <Pagination
        sx={{ display: "flex", justifyContent: "center", mt: 2 }}
        count={count || 10}
        page={page}
        onChange={handleChangePage}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </Stack>
  );
}
