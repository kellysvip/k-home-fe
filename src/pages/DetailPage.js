import { ThemeProvider } from "@emotion/react";
import {
  Avatar,
  Box,
  Button,
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
import { Link, useParams } from "react-router-dom";
import HorizontalLine from "../components/HorizontalLine";
const theme = createTheme();

function DetailPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [error, setError] = useState("");
  let params = useParams();

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
              "Cho thuê chung cư mini trung tâm SG, khu an ninh, có sân vườn thoáng mát, giá chỉ … ",
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
  console.log(products.title);
  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{ display: "flex", justifyContent: "space-around", mt: 3 }}
      >
        <Paper elevation={10} sx={{ padding: "10px", paddingTop: "0" }}>
          <Stack sx={{ maxWidth: "700px" }}>
            <Box sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                image="https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2022/10/05/20191027-112111-01_1664982032.jpg"
                alt="cHomePic"
                sx={{ position: "relative", minWidth: "700px" }}
              />
            </Box>
            <Box sx={{ position: "relative" }}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ overflowY: "hidden", fontWeight: "bold" }}
              >
                Cho thuê chung cư mini trung tâm SG, khu an ninh, có sân vườn
                thoáng mát, giá chỉ …
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: "#657786", overflow: "hidden" }}
              >
                Quận Thủ Đức, Hồ Chí Minh
              </Typography>
              <Typography
                sx={{ color: "#0499a8", fontWeight: "700", fontSize: "38px" }}
              >
                1 Triệu
              </Typography>
            </Box>
            <Box sx={{ position: "relative" }}>
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
                      <TableCell align="center">Area</TableCell>
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
                        Available
                      </TableCell>
                      <TableCell align="center">22/12/2022</TableCell>
                      <TableCell align="center">25</TableCell>

                      <TableCell align="center">3</TableCell>
                      <TableCell align="center">2</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Box sx={{ position: "relative" }}>
              <Typography
                sx={{ color: "#3c4146", fontWeight: "700", fontSize: "20px" }}
              >
                Description
              </Typography>
              <Typography>
                Phòng Diện Tích Rộng, Cửa Sổ, Thoáng Mát, Tiện Nghi Ngay Ngã Tư
                Hàng Xanh <br />
                - Địa Chỉ: 8/18, Đinh Bộ Lĩnh, Phường 24, Q. Bình Thạnh, TP.
                HCM. - <br />
                Rất tiện lợi vì 2 phút tới chợ, gần các trường đại học Hutech,
                GTVT, Ngoại Thương... Gần bến xe và các trung tâm thương mại...{" "}
                <br />
                - Diện Tích: 30m2. <br />
                - Điện 3.5k/kw
                <br />
                - Nước: 100k/người. - Phí Dịch vụ: 150k/phòng. Giờ giấc tự do,
                không chung chủ. Phòng có cửa sổ thoáng mát, toilet riêng. Nội
                thất gồm:
                <br />
                +Giường, Nệm +Tủ quần áo.
                <br />
                +Máy lạnh. <br />
                + Tủ lạnh
                <br />
                +Bàn việc. +Nước nóng năng lượng mặt trời. <br />
                +Máy giặt chung. +Khu vực dân trí cao an ninh, camera trong nhà
                24/24, <br />
                +Phòng đã <br />
                -Giá thuê: 5.3tr/ tháng <br />
                -Liên Hệ: Thuấn
              </Typography>
            </Box>
          </Stack>
        </Paper>
        <Paper
          elevation={10}
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "35vh",
            minWidth: "50vh",
          }}
        >
          <Stack
            direction="row"
            sx={{
              m: 3,
              paddingBottom: "15px",
              borderBottom: "1px solid #e6ecf0",
            }}
          >
            <Avatar
              sx={{ mt: 1 }}
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
            />
            <Box sx={{ ml: 3 }}>
              <Typography variant="h5">Nguyễn Văn A</Typography>
              <Typography sx={{ fontSize: "15px", color: "gray" }}>
                Đã tham gia 16 ngày
              </Typography>
            </Box>
          </Stack>
          <Box
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              border: "1px solid #01adba",
              borderRadius: "10px",
              ml: 2,
              mr: 2,
            }}
          >
            <Typography
              sx={{
                color: "#01adba",
                fontWeight: "600",
                fontSize: "15px",
                ml: "10px",
              }}
            >
              Phone: 0966044151
            </Typography>
            <Button
              variant="outlined"
              sx={{
                color: "#01adba",
                fontWeight: "600",
                fontSize: "15px",
                border: "1px solid #fff",
                m: 1,
              }}
            >
              Call now
            </Button>
          </Box>
          <Button
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              border: "1px solid #dcedc8",
              color: "#01adba",
              borderRadius: "10px",
              fontWeight: "600",
              mt: 1,
              ml: 2,
              mr: 2,
            }}
          >
            Chat Now
          </Button>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default DetailPage;
