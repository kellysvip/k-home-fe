import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import {
  Alert,
  Box,
  Container,
  createTheme,
  Stack
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { useForm } from "react-hook-form";
import { FormProvider } from "../components/form";
import ProductFilter from "../components/product/ProductFilter";
import ProductSearch from "../components/product/ProductSearch";
import ProductSort from "../components/product/ProductSort";
import ProductList from "../components/product/ProductList";
import LoadingScreen from "../components/LoadingScreen";
import { orderBy } from "lodash";
import { blue } from "@mui/material/colors";

const theme = createTheme();


function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [page, setPage] = useState(0);
  const [error, setError] = useState("");


  const defaultValues = {
    type: [],
    time: "All",
    priceRange: "",
    // sortBy: "featured",
    // searchQuery: "",
  };
  const methods = useForm({
    defaultValues,
  });
  console.log(methods);
  const { watch, reset } = methods;
  const filters = watch();
  const filterProducts = applyFilter(products, filters);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        // const res = await apiService.get("/data");
        setProducts([
          {
            id: "639d71a6158f11fe11a4626c",
            author: "639c1da222cb24eca949b6ad",
            title:
              " Cho thuê chung cư mini trung tâm SG, khu an ninh, có sân vườn thoáng mát, giá chỉ … ",
            imageUrl:
              "https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2022/10/05/20191027-112111-01_1664982032.jpg",
            address: "Quận Thủ Đức, Hồ Chí Minh",
            price: 2.2,
            noBedroom: 5,
            noBathroom: 3,
            description:
              "Vị trí: Số 16/2 Đường số 44, Phường Hiệp Bình Chánh, Quận Thủ Đức (gần Chợ Hiệp Bình)Thuộc khu vực trung tâm Thành phố Sài Gòn, với Đại lộ…",
            area: "32",
            status: "available",
            isDelete: false,
            createdAt: {
              $date: {
                $numberLong: "1671262630930",
              },
            },
            updatedAt: {
              $date: {
                $numberLong: "1671262630930",
              },
            },
            __v: 0,
          },
        ]);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getProducts();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
        <Paper elevation={10} sx={{ mr: "20px" }}>
          <Stack>
            <FormProvider methods={methods}>
              <ProductFilter resetFilter={reset} />
            </FormProvider>
          </Stack>
        </Paper>
        <Stack sx={{}}>
          <FormProvider methods={methods}>
            <Stack
              spacing={2}
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ sm: "center" }}
              justifyContent="space-between"
              mb={2}
            >
              <ProductSearch />
              <ProductSort />
            </Stack>
          </FormProvider>

          <Box sx={{ position: "relative", height: 1 }}>
            {loading ? (
              <LoadingScreen />
            ) : (
              <>
                {error ? (
                  <Alert severity="error">{error}</Alert>
                ) : (
                  <ProductList products={filterProducts} />
                )}
              </>
            )}
          </Box>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

function applyFilter(products, filters) {
  const { sortBy } = filters;
  let filteredProducts = products;

  // SORT BY
  if (sortBy === "featured") {
    filteredProducts = orderBy(products, ["sold"], ["desc"]);
  }
  if (sortBy === "newest") {
    filteredProducts = orderBy(products, ["createdAt"], ["desc"]);
  }
  if (sortBy === "priceDesc") {
    filteredProducts = orderBy(products, ["price"], ["desc"]);
  }
  if (sortBy === "priceAsc") {
    filteredProducts = orderBy(products, ["price"], ["asc"]);
  }

  // FILTER PRODUCTS
  if (filters.type.length > 0) {
    filteredProducts = products.filter((product) =>
      filters.type.includes(product.type)
    );
  }
  if (filters.time !== "All") {
    filteredProducts = products.filter(
      (product) => product.time === filters.time
    );
  }
  if (filters.priceRange) {
    filteredProducts = products.filter((product) => {
      if (filters.priceRange === "below") {
        return product.price < 1;
      }
      if (filters.priceRange === "between") {
        return product.price >= 1 && product.price <= 3;
      }
      return product.price > 3;
    });
  }
  if (filters.searchQuery) {
    filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
    );
  }
  return filteredProducts;
}
export default HomePage;
