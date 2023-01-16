import { styled } from "@mui/material/styles";
import {
  Link,
  Card,
  CardHeader,
  Stack,
  Box,
  Paper,
  Avatar,
  Typography,
  ToggleButton,
  Button,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import FavoriteIcon from "@mui/icons-material/Favorite";

import React from "react";

function UserInfoCard({ profile }) {
  const [bookmark, setBookmark] = React.useState(false);
  console.log("profile", profile);
  return (
    <Stack
      direction="column"
    >
      <Paper
        elevation={10}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "40vh",
          minWidth: {md: "50vh"},
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
          <Avatar sx={{ mt: 1 }} alt={profile?.name} src={profile?.avatarUrl} />
          <Box sx={{ ml: 3 }}>
            <Typography variant="h5">{profile?.name}</Typography>
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
            Phone: {profile?.phoneNumber}
          </Typography>
          <Button
            variant="outlined" //
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
            border: "1px solid #01adba",
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

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          mt: 3,
        }}
      >
        <ToggleButton
          value="check"
          selected={bookmark}
          onChange={() => {
            setBookmark(!bookmark);
          }}
          sx={{ color: "#f06292" }}
        >
          <FavoriteIcon /> {bookmark ? "Save now" : "Not save"}
        </ToggleButton>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Avatar
            sx={{ mr: 3 }}
            alt="Facebookink"
            src="https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/640px-Facebook_f_logo_%282021%29.svg.png"
          />
          <Avatar
            alt="InstagramLink"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/132px-Instagram_logo_2016.svg.png"
          />
        </Box>
      </Box>
    </Stack>
  );
}

export default UserInfoCard;
