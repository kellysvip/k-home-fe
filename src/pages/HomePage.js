import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import {
  Alert,
  Box,
  Breadcrumbs,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  Stack,
  Typography,
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

const theme = createTheme();
function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [error, setError] = useState("");

  const auth = useAuth();

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
            id: "e2d94bbf-0530-425a-a1ed-3177c5822c4e",
            title: " Căn Hộ MiNi full nội thất ngay Đại Học Ngân Hàng ",
            price: "4.5 triệu/tháng",
            squareInArea: "25m²",
            location: "Quận Thủ Đức, Hồ Chí Minh",
            postTime: "08/10/2022",
            postSummary:
              "️ Giá thuê : 4,5tr . 5tr ️ Địa chỉ : 68 đường số 9 , phường Linh Trung , Quận Thủ Đức .Nhà ngay Trung Tâm Thủ Đức , gần trường ĐH Ngân Hàng , ĐH Sư…",
            imageLink:
              "https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2022/10/08/received-5400905793259001_1665218113.jpg",
          },
          {
            id: "166cfa39-4310-46c4-9f18-20a458e4e412",
            title:
              " Cho thuê chung cư mini trung tâm SG, khu an ninh, có sân vườn thoáng mát, giá chỉ … ",
            price: "2.2 triệu/tháng",
            squareInArea: "32m²",
            location: "Quận Thủ Đức, Hồ Chí Minh",
            postTime: "05/10/2022",
            postSummary:
              "Vị trí: Số 16/2 Đường số 44, Phường Hiệp Bình Chánh, Quận Thủ Đức (gần Chợ Hiệp Bình)Thuộc khu vực trung tâm Thành phố Sài Gòn, với Đại lộ…",
            imageLink:
              "https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2022/10/05/20191027-112111-01_1664982032.jpg",
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
