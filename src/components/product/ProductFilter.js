import { Box, Button, Stack, Typography } from "@mui/material";
import { FMultiCheckbox, FRadioGroup } from "../form";
import ClearAllIcon from "@mui/icons-material/ClearAll";

export const SORT_BY_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "priceDesc", label: "Price: High-Low" },
  { value: "priceAsc", label: "Price: Low-High" },
];

export const FILTER_LOCATION_OPTIONS = ["Motel", "Home", "Apartment"];

export const FILTER_TIME_OPTIONS = [
  "All",
  "Yesterday",
  "1 week ago",
  "1 month ago",
];

export const FILTER_PRICE_OPTIONS = [
  { value: "below", label: "Below 1 milion Dong" },
  { value: "between", label: "Between 1 - 3 milion Dong" },
  { value: "above", label: "Above 3 milion Dong" },
];

function ProductFilter({resetFilter}) {
  return (
    <Stack spacing={1} sx={{ p: 3, width: 220 }}>
      <Stack >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Type
        </Typography>
        <FMultiCheckbox
          name="type"
          options={FILTER_LOCATION_OPTIONS}
          sx={{ width: 1 }}
        />
      </Stack>

      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Time
        </Typography>
        <FRadioGroup name="time" options={FILTER_TIME_OPTIONS} row={false} />
      </Stack>

      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Price
        </Typography>
        <FRadioGroup
          name="priceRange"
          options={FILTER_PRICE_OPTIONS.map((item) => item.value)}
          getOptionLabel={FILTER_PRICE_OPTIONS.map((item) => item.label)}
        />
      </Stack>

      <Box>
        <Button
          size="large"
          type="submit"
          color="inherit"
          variant="outlined"
          onClick={resetFilter}
          startIcon={<ClearAllIcon />}
        >
          Clear All
        </Button>
      </Box>
    </Stack>
  );
}

export default ProductFilter;