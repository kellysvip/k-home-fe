import { Box } from "@mui/material";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getConversations,
} from "../../features/conversation/conversationSlice";
import { getMessages } from "../../features/message/messageSlice";
import useAuth from "../../hooks/useAuth";
import Message from "./Message";

const MessageCard = () => {
  const { user } = useAuth();
  const userId = user._id;
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.post);
  const ownPostId = products?.author._id;
  const ownPostAvtInfo = products?.author.avatarUrl

  const { conversation  } = useSelector(
    (state) => state.conversation
  );
  const conversationId = conversation?._id;

  const { currentPageMessage, messagesById } = useSelector(
    (state) => state.message
  );
  const messages = currentPageMessage.map(
    (messageId) => messagesById[messageId]
  );

 

  useEffect(() => {
    try {
      dispatch(getConversations({ userId, ownPostId }));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, ownPostId]);

  useEffect(() => {
    try {
      if (conversationId) dispatch(getMessages({ conversationId })); //err
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, conversationId]);
  return (
    <Box sx={{ height: "250px", overflowY: "scroll", mb: "5px", mt: 1 }}>
      {messages.map((message) => (
        <Message
          message={message}
          own={message.senderId === user._id ? true : false}
          ownPostAvtInfo={ownPostAvtInfo}
        />
      ))}
    </Box>
  );
};

export default MessageCard;
