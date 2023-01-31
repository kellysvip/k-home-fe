import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { FormProvider, FTextField } from "../form";
import SendIcon from "@mui/icons-material/Send";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../features/message/messageSlice";
import { io } from "socket.io-client";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

const InputTextSend = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const methods = useForm({});
  const socket = useRef();
  const {
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = methods;
  const { conversation, senderId } = useSelector((state) => state.conversation);

  const onSubmit = async (data, e) => {
    // e.preventDefault()
    try {
      const messageData = {
        conversationId: conversation?._id,
        senderId: user._id,
        text: data.message,
      };
      dispatch(addMessage(messageData));
      setValue("message", "")
    } catch (error) {
      reset();
      console.log(error);
      setError("responseError", error);
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box
        flexDirection="row"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <FTextField sx={{ width: "85%" }} name="message" />
        <IconButton type="submit">
          <SendIcon fontSize="large" />
        </IconButton>
      </Box>
    </FormProvider>
  );
};

export default InputTextSend;
