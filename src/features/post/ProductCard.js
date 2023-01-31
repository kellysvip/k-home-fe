import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useAuth from "../../hooks/useAuth";
import { Box } from "@mui/system";
import ChangeProductModal from "./ChangeProductModal";
import { useDispatch } from "react-redux";
import { deletePost } from "./postSlice";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green, red, yellow } from "@mui/material/colors";
import useWindowSize from "../../hooks/useWindowSize";

const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: yellow[500],
    },
    third: {
      main: red[500],
    },
  },
});
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  alignItems: "center",
};

function ProductCard({ product }) {
  const { user } = useAuth();
  const size = useWindowSize();
  const postId = product._id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openModalChange, setOpenModalChange] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    handleCloseMenu();
  };

  const handleOpenModalChange = () => setOpenModalChange(true);
  const handleCloseModalChange = () => {
    setOpenModalChange(false);
    setAnchorEl(null);
  };
  const handleDeletePost = () => {
    dispatch(deletePost({ postId }));
    handleClose();
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const renderMenu = (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleCloseMenu}
    >
      <MenuItem onClick={handleOpenModalChange} sx={{ mx: 1 }}>
        Change
      </MenuItem>
      <Divider sx={{ boderyStyle: "dashed" }} />
      <MenuItem onClick={handleOpen} sx={{ mx: 1 }}>
        Delete
      </MenuItem>
    </Menu>
  );

  const renderModalChange = (
    <Modal
      open={openModalChange}
      onClose={handleCloseModalChange}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <ChangeProductModal product={product} />
      </Box>
    </Modal>
  );

  const renderModalDelete = (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          You want delete this post???
        </Typography>
        <Button onClick={handleDeletePost}>DELETE</Button>
        <Button onClick={handleClose}>LATER</Button>
      </Paper>
    </Modal>
  );
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ maxHeight: "227px", flexGrow: 1 }}>
        <CardActionArea>
          <Stack direction="row">
            <CardMedia
              component="img"
              image={product.imageUrl}
              alt="kHomePic"
              onClick={() => navigate(`/product/${product._id}`)}
              sx={{
                position: "relative",
                top: "-13px",
                width: { xs: "150px", md: "250px", borderRadius: "5px" },
                height: "240px",
                maxWidth: "250px",
              }}
            />
            <CardContent>
              <Stack
                flexDirection="row"
                sx={{ justifyContent: "space-between" }}
              >
                <Typography
                  gutterBottom
                  variant="h4"
                  component="div"
                  onClick={() => navigate(`/product/${product._id}`)}
                  sx={{
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                  }}
                >
                  {product.title}
                </Typography>
                {user._id === product.author && (
                  <IconButton
                    onClick={handleOpenMenu}
                    sx={{ height: "50px", top: "-5px" }}
                  >
                    <MoreVertIcon fontSize="large" />
                  </IconButton>
                )}
                {renderMenu}
              </Stack>
              <Stack
                direction="column"
                spacing={0}
                justifyContent="flex-start"
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ color: "#657786", overflow: "hidden" }}
                >
                  {product.address}
                </Typography>
                <Typography variant="subtitle2">
                  {product.area}m2 {product.noBedroom} PN {product.noBathroom}{" "}
                  WC
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "#0499a8", fontWeight: "700", fontSize: "20px" }}
                >
                  {product.price} Triệu
                </Typography>

                <Stack flexDirection="row">
                  <Typography variant="subtitle1">
                    {product?.updatedAt?.slice(0, 10)}
                  </Typography>
                  {product.status === "available"
                    ? size.width >= 430 && (
                        <Button
                          variant="contained"
                          sx={{
                            padding: 0,
                            paddingX: "8px",
                            ml: 3,
                            backgroundColor: "primary.main",
                            fontSize: "13px",
                          }}
                        >
                          Available
                        </Button>
                      )
                    : product.status === "reserve"
                    ? size.width >= 430 && (
                        <Button
                          variant="contained"
                          sx={{
                            padding: 0,
                            paddingX: "8px",
                            ml: 3,
                            backgroundColor: "secondary.main",
                            fontSize: "13px",
                          }}
                        >
                          Reserve
                        </Button>
                      )
                    : size.width >= 430 && (
                        <Button
                          variant="contained"
                          sx={{
                            padding: 0,
                            paddingX: "8px",
                            ml: 3,
                            backgroundColor: "third.main",
                            fontSize: "13px",
                          }}
                        >
                          Rented
                        </Button>
                      )}
                </Stack>
              </Stack>
            </CardContent>
          </Stack>
        </CardActionArea>
        {renderModalDelete}
        {renderModalChange}
      </Card>
    </ThemeProvider>
  );
}

export default ProductCard;
