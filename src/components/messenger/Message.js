import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";

const Message = ({ message, own,ownPostAvtInfo }) => {
  console.log(message);
  return (
    <div>
      {!own ? (
        <Stack flexDirection="row">
          <Avatar sx={{ mr: 1, ml: "2px" }} src={ownPostAvtInfo} />
          <Typography
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            mt: "2px",
            padding: "10px",
            width: "200px",
            borderRadius: "20px",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            overflowX: "hidden",
          }}
        >
          {message.text}
        </Typography>
        </Stack >
      ) : (
        <Stack>
          <Typography
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "flex-end",
            mt: "2px",
            padding: "10px",
            width: "200px",
            backgroundColor: "#03a9f4",
            borderRadius: "20px",
            overflowX: "hidden",
            alignSelf: "flex-end"
          }}
        >
          {message.text}
        </Typography>
        </Stack>
      )}
    </div>
  );
};

export default Message;
