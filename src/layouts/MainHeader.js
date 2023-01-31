import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import RoofingIcon from "@mui/icons-material/Roofing";
import useAuth from "../hooks/useAuth";
import LoginIcon from "@mui/icons-material/Login";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { createTheme, Modal } from "@mui/material";
import CreatePostModal from "../features/post/CreatePostModal";
import { Link as RouterLink } from "react-router-dom";

let theme = createTheme({
  palette: {
    primary: {
      main: "#e3f2fd",
    },
    secondary: {
      main: "#f44336",
    },
  },
});

function MainHeader() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);

  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenHomePage = () => {
    setAnchorElUser(null);
    navigate("/");
  };

  const handleOpenAccountPage = () => {
    setAnchorElUser(null);
    navigate("/user/me");
  };

  const handleLogout = async () => {
    try {
      handleCloseUserMenu();
      await logout(() => navigate("/login"));
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleRent = () => {
    console.log('object');
      if (!isAuthenticated) {
        navigate("/login");
      } else navigate("/");
    
  };
  const handleOpenDashboardPage = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else handleCloseUserMenu();
  }

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        color="primary"
        sx={{ borderRadius: "5px", height: "60px" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <RoofingIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 3,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              K-HOME
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem key="Rent" onClick={handleRent}>
                  <Typography textAlign="center">Rent</Typography>
                </MenuItem>
                <MenuItem key="Support" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Support</Typography>
                </MenuItem>
                <MenuItem key="Pricing" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Pricing</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <RoofingIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              K-HOME
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                key="Rent"
                onClick={handleRent}
                sx={{
                  my: 2,
                  color: "#111",
                  display: "block",
                  fontWeight: 600,
                  fontSize: "12px",
                }}
              >
                Rent
              </Button>
              <Button
                key="Support"
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "#111",
                  display: "block",
                  fontWeight: 600,
                  fontSize: "12px",
                }}
              >
                Support
              </Button>
              <Button
                key="Pricing"
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "#111",
                  display: "block",
                  fontWeight: 600,
                  fontSize: "12px",
                }}
              >
                Pricing
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0, mr: 2, }}>
              <Button
                onClick={handleOpenModal}
                variant="contained"
                sx={{
                  padding: "18px 25px",
                  lineHeight: "0",
                  backgroundColor: "#01adba",
                  color: "#fff",
                  fontWeight: "600",
                  fontSize: "13px",
                }}
              >
                post
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {user ? (
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Avatar" src={user?.avatarUrl} />
                  </IconButton>
                </Tooltip>
              ) : (
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={() => {
                    navigate("/login");
                  }}
                  color="inherit"
                >
                  <LoginIcon />
                </IconButton>
              )}
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key="Home" onClick={handleOpenHomePage}>
                  <Typography sx={{ color: "secondary" }} textAlign="center">
                    Home
                  </Typography>
                </MenuItem>
                <MenuItem key="Account" onClick={handleOpenAccountPage}>
                  <Typography textAlign="center">Account</Typography>
                </MenuItem>
                <MenuItem key="Dashboard" onClick={handleOpenDashboardPage}>
                  <Typography textAlign="center">Dashboard</Typography>
                </MenuItem>{" "}
                <MenuItem key="Logout" onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <CreatePostModal open={openModal} setOpen={setOpenModal} />
    </ThemeProvider>
  );
}

export default MainHeader;
