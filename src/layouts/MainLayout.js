import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
import { ToastContainer } from "react-toastify";
import AlertMsg from "../components/AlertMsg";
//, m: "-10px"
function MainLayout() {
  return (
    <Stack sx={{ minHeight: "100vh", bgcolor: "rgb(232,240,254)" }}> 
    
      <MainHeader />
      <AlertMsg/>
      <Outlet />

      <Box sx={{ flexGrow: 1 }} />

      <MainFooter />
    </Stack>
  );
}

export default MainLayout;