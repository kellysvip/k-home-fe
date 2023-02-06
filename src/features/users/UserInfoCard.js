import {
  Stack,
  Box,
  Paper,
  Avatar,
  Typography,
  ToggleButton,
  Button,
  Link,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

import React, { useState } from "react";
import { createConversation } from "../conversation/conversationSlice";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { addBookmark, deleteBookmark } from "../bookmark/bookmarkSlice";
import { useNavigate } from "react-router-dom";

function UserInfoCard({ profile, productId }) {
  const { user } = useAuth();
  const userId = user._id;
  const navigate = useNavigate()

  const [bookmark, setBookmark] = React.useState(false);

  const dispatch = useDispatch();

  const handleCreateConversation = () => {
    try {
      let members = {
        senderId: userId,
        receiverId: profile._id,
      };
      if (userId && profile._id ) {
        dispatch(createConversation({ members }));
      }
      navigate("/messenger")
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddBookmark = () => {
    if (bookmark) {
      setBookmark(false);
      dispatch(deleteBookmark({ productId }));
    } else {
      setBookmark(true);
      dispatch(addBookmark({ productId }));
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
            sx={{
              color: "#01adba",
              fontWeight: "600",
              fontSize: "15px",
              m: 1,
            }}
          >
            <Link
              href={`https://zalo.me/${profile?.phoneNumber}`}
              target="_blank"
              sx={{color: "#01adba", textDecoration: "none"}}
            >
              Call Now
            </Link>
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
            mb: 3,
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
          onChange={handleAddBookmark}
          sx={{ color: "#f06292" }}
        >
          <FavoriteIcon /> {!bookmark ? "Saved" : "Save now"}
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
