import React, {  useState } from "react";
import { ThemeProvider } from "@emotion/react";
import {
  Alert,
  Box,
  Container,
  createTheme,
  Grid,
  Stack,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { useForm } from "react-hook-form";
import { FormProvider } from "../components/form";
import ProductSearch from "../components/product/ProductSearch";
import ProductSort from "../components/product/ProductSort";
import ProductList from "../features/post/ProductList";
import ProductAddressSort from "../components/product/ProductAddressSort";
import ProductPriceSort from "../components/product/ProductPriceSort";

const theme = createTheme();

function HomePage() {
  const [error, setError] = useState("");

  const defaultValues = {
    address: "",
    price: "",
    sortBy: "featured",
  };
  const methods = useForm({
    defaultValues,
  });
  const { watch } = methods;
  const filters = watch();

  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          mt: 3,
        }}
      >
        <FormProvider methods={methods}>
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ sm: "center" }}
            justifyContent="space-between"
            mb={2}
          >
            <ProductSearch />
            <Stack sx={{ flexDirection: { md: "row", xs: "column" } }}>
              <ProductAddressSort />
              <ProductPriceSort />
              <ProductSort />
            </Stack>
          </Stack>
        </FormProvider>
        <Stack sx={{ display: "flex", flexDirection: "row" }}>
          <Stack>
            <Paper
              elevation={10}
              sx={{
                display: { xs: "none", md: "flex" },
                mr: "20px",
                backgroundColor: "none",
                maxWidth: "300px",
              }}
            >
              <Stack sx={{ width: 300 }}>
                <img
                  src="https://cdn.mogi.vn/banner/2022/2_0bf5f0d6-91c3-457e-b1fa-6d8f70cd823f.png"
                  alt=""
                />
              </Stack>
            </Paper>
          </Stack>

          <Grid container spacing={3}>
            <Grid item xs={12} md={0}>
              <Box sx={{ position: "relative", height: 1 }}>
                <>
                  {error ? (
                    <Alert severity="error">{error}</Alert>
                  ) : (
                    <ProductList filters={filters} />
                  )}
                </>
              </Box>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default HomePage;
