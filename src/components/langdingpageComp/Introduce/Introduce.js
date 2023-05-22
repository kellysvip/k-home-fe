import { Container, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import ButtonFind from "../Button/ButtonFind";
const Introduce = () => {

  return (
    <section>
      <Box
        minHeight="75vh"
        width="100%"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url('https://images.unsplash.com/photo-1574362988989-47a060d0f646?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=710&q=80`,
          backgroundSize: "cover",
          borderRadius: "10px",
          backgroundPosition: "center",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid
            container
            item
            xs={12}
            lg={8}
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            sx={{ mx: "auto", textAlign: "center" }}
          >
            <Typography
              variant="h2"
              color="white"
              sx={{ fontFamily: "cursive" }}
            >
              Chọn K-HOME, Chọn tổ ấm
            </Typography>
            <Typography
              variant="body1"
              color="white"
              sx={{ fontFamily: "monospace" }}
              opacity={0.8}
              mt={1}
              mb={3}
            >
              Chúng tôi luôn sẵn sàn mang đến cho bạn nơi ở tốt nhất
            </Typography>
            <ButtonFind/>
            <Typography variant="h6" color="white" mt={8} mb={1}>
              Find us on
            </Typography>
            <Box display="flex" justifyContent="center" alignItems="center">
              <IconButton sx={{ color: "white" }}>
                <FacebookIcon fontSize="large" />
              </IconButton>
              <IconButton sx={{ color: "white" }}>
                <TwitterIcon fontSize="large" />{" "}
              </IconButton>
              <IconButton sx={{ color: "white" }}>
                <GoogleIcon fontSize="large" />
              </IconButton>
            </Box>
          </Grid>
        </Container>
      </Box>
    </section>
  );
};

export default Introduce;
