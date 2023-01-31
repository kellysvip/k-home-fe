import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
//, m: "-10px"
function MainLayout() {
  return (
    <Stack sx={{ minHeight: "100vh", bgcolor: "rgb(232,240,254)" }}> 
      <MainHeader />
      
      <Outlet />

      <Box sx={{ flexGrow: 1 }} />

      <MainFooter />
    </Stack>
  );
}

export default MainLayout;