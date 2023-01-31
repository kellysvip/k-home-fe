import { Stack } from "@mui/system";
import React from "react";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import InputTextSend from "./InputTextSend";
import MessageCard from "./MessageCard";

const MessengerForm = () => {
  

  return (
    <div>
      <Stack
        flexDirection="column"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <MessageCard />
        <InputTextSend />
      </Stack>
    </div>
  );
};

export default MessengerForm;
