import React from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { Box, createTheme, CssBaseline, Grid } from "@mui/material";
import Paper from "@mui/material/Paper";

const theme = createTheme();
function HomePage() {
  const auth = useAuth();
  let navigate = useNavigate();
  console.log(auth);
  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={3}
          md={7}
          
      >
        <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            
          >hello</Box>
      </Grid>
        <Grid item xs={12} sm={8} md={5}  elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          ></Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default HomePage;
