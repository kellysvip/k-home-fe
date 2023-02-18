import {
  Box,
  Container,
  createTheme,
  Link,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BreadCrumbs from "../components/BreadCrumbs";
import SimpleMap from "../components/Map";
import ImageSliderProduct from "../components/product/ImageSliderProduct";
import { getPosts, getSinglePost } from "../features/post/postSlice";
import PostSlider from "../features/post/PostSlider";
import UserInfoCard from "../features/users/UserInfoCard";
import useWindowSize from "../hooks/useWindowSize";


const breadcrumbsHomePage = [
  <Link underline="hover" key="1" color="inherit" href="/landingpage">
    K-HOME
  </Link>,
  <Link underline="hover" key="2" color="inherit" href="/">
    Home
  </Link>,
  <Typography key="3" color="text.primary">
    Product
  </Typography>,
];

function DetailPage() {
  const { _id } = useParams();
  const size = useWindowSize();
  const dispatch = useDispatch();
  const { product, currentPagePost, postsById } = useSelector(
    (state) => state.post
  );
  const products = currentPagePost.map((postId) => postsById[postId]);
  useEffect(() => {
    dispatch(getSinglePost({ _id }));
    dispatch(getPosts({}));
  }, [_id, dispatch]);

  return (
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: 2,
        }}
      >
        <BreadCrumbs breadcrumb={breadcrumbsHomePage} />
        <Stack
          flexDirection="row"
          sx={{
            justifyContent: "space-around",
            mt: 2,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              padding: "5px",
              paddingTop: "0",
              maxWidth: { xs: "320px", sm: "700px", md: "700px" },
            }}
          >
            <Stack sx={{ maxWidth: "700px", overflow: "hidden" }}>
              <Box sx={{ position: "relative" }}>
                <ImageSliderProduct />
              </Box>
              <Box sx={{ position: "relative", mt: 1 }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ overflowY: "hidden", fontWeight: "bold" }}
                >
                  {product?.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "#657786", overflow: "hidden" }}
                >
                  {product?.address}
                </Typography>
                <Typography
                  sx={{ color: "#0499a8", fontWeight: "700", fontSize: "38px" }}
                >
                  {product?.price} Triệu
                </Typography>
              </Box>
              <Box sx={{ position: "relative", mt: 3 }}>
                <Typography
                  sx={{ color: "#3c4146", fontWeight: "700", fontSize: "20px" }}
                >
                  Infomation
                </Typography>
                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: 650, fontWeight: "700" }}
                    aria-label="simple table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Time</TableCell>
                        <TableCell align="center">Area(m2)</TableCell>
                        <TableCell align="center">Number Bedroom</TableCell>
                        <TableCell align="center">Number Bathroom</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow
                        key="hello"
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row" align="center">
                          {product?.status}
                        </TableCell>
                        <TableCell align="center">
                          {product?.updatedAt}
                        </TableCell>
                        <TableCell align="center">{product?.area}</TableCell>

                        <TableCell align="center">
                          {product?.noBedroom}
                        </TableCell>
                        <TableCell align="center">
                          {product?.noBathroom}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              <Box sx={{ position: "relative", mt: 2 }}>
                <Typography
                  sx={{ color: "#3c4146", fontWeight: "700", fontSize: "20px" }}
                >
                  Description
                </Typography>
                <Typography sx={{ mt: "2px", mb: 2 }}>
                  {product?.description}
                </Typography>
                <SimpleMap position={product?.address} />
                {size.width < 900 && (
                  <UserInfoCard profile={product?.author} products={product} />
                )}
              </Box>{" "}
              <PostSlider products={products} />
            </Stack>
          </Paper>

          {size.width >= 900 && (
            <div>
              <UserInfoCard
                profile={product?.author}
                productId={product?._id}
              />
            </div>
          )}
        </Stack>
      </Container>
  );
}

export default DetailPage;
