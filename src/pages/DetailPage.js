import { ThemeProvider } from "@emotion/react";
import {
  Box,
  CardMedia,
  Container,
  createTheme,
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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import apiService from "../app/apiService";
import SimpleMap from "../components/Map";
import MessengerForm from "../components/messenger/MessengerForm";
import { getSinglePost } from "../features/post/postSlice";
// import PostSlider from "../features/post/PostSlider";
import UserInfoCard from "../features/users/UserInfoCard";
import useWindowSize from "../hooks/useWindowSize";
const theme = createTheme();

function DetailPage() {
  const { _id } = useParams();
  const size = useWindowSize();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getSinglePost({ _id }));
  }, [_id, dispatch]);
  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{ display: "flex", justifyContent: "space-around", mt: 3 }}
      >
        <Paper
          elevation={0}
          sx={{
            padding: "5px",
            paddingTop: "0",
            maxWidth: { xs: "320px", sm: "700px", md: "700px" },
          }}
        >
          <Stack sx={{ maxWidth: "700px" }}>
            <Box sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                image={products?.imageUrl}
                alt="cHomePic"
                sx={{ position: "relative", minWidth: { md: "700px" } }}
              />
            </Box>
            <Box sx={{ position: "relative", mt: 1 }}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ overflowY: "hidden", fontWeight: "bold" }}
              >
                {products?.title}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: "#657786", overflow: "hidden" }}
              >
                {products?.address}
              </Typography>
              <Typography
                sx={{ color: "#0499a8", fontWeight: "700", fontSize: "38px" }}
              >
                {products?.price} Triệu
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
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="center">
                        {products?.status}
                      </TableCell>
                      <TableCell align="center">
                        {products?.updatedAt}
                      </TableCell>
                      <TableCell align="center">{products?.area}</TableCell>

                      <TableCell align="center">
                        {products?.noBedroom}
                      </TableCell>
                      <TableCell align="center">
                        {products?.noBathroom}
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
                {products?.description}
              </Typography>
              <SimpleMap position={products?.address} />
              {size.width < 900 && <UserInfoCard profile={products?.author} />}
            </Box>{" "}
            {/* <PostSlider /> */}
          </Stack>
        </Paper>

        {size.width >= 900 && (
          <div>
            <UserInfoCard profile={products?.author} />
          </div>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default DetailPage;
