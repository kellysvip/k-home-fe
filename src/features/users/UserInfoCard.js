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
import FavoriteIcon from "@mui/icons-material/Favorite";

import React, { useState } from "react";
import { createConversation } from "../conversation/conversationSlice";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import MessengerForm from "../../components/messenger/MessengerForm";

function UserInfoCard({ profile }) {
  const [bookmark, setBookmark] = React.useState(false);
  const [conv, setConv] = useState(false);
  const dispatch = useDispatch();
  const { user } = useAuth();
  const userId = user._id;
  const handleCreateConversation = () => {
    conv ? setConv(false) : setConv(true);
    try {
      let members = {
        senderId: userId,
        receiverId: profile._id,
      };
      if (userId && profile._id) {
        dispatch(createConversation({ members }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack direction="column">
      <Paper
        elevation={10}
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: { md: "50vh" },
          mt: { md: 0, sm: 2, xs: 2 },
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
          onClick={handleCreateConversation}
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
            mb: 3
          }}
        >
          {conv ? "Quit Chat" : "Chat Now"}
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
      {conv && (
        <Paper sx={{ minHeight: "40vh", mt: 1 }}>
          <MessengerForm />
        </Paper>
      )}
    </Stack>
  );
}

export default UserInfoCard;
