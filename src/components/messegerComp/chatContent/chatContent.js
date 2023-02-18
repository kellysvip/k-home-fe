import React, { useState, createRef } from "react";

import "./chatContent.css";
import Avatar from "../chatList/Avatar";
import ChatItem from "./chatItems";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../../hooks/useAuth";
import { addMessage } from "../../../features/message/messageSlice";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import SendIcon from "@mui/icons-material/Send";
import { Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
const ChatContent = () => {
  const { user } = useAuth();
  const [mess, setMess] = useState("");
  const messagesEndRef = createRef(null);
  const dispatch = useDispatch();
  const { currentPageMessage, messagesById, conversationInfo } = useSelector(
    (state) => state.message
  );
  const messages = currentPageMessage.map(
    (messageId) => messagesById[messageId]
  );

  // function constructor(props) {
  //   // super(props);
  //   state = {
  //     chat: this.chatItms,
  //     msg: "",
  //   };
  // }

  // const scrollToBottom = () => {
  //   messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  // };

  // function componentDidMount() {
  //   // window.addEventListener("keydown", (e) => {
  //   //   if (e.keyCode == 13) {
  //   //     if (state.msg != "") {
  //   //       chatItms.push({
  //   //         key: 1,
  //   //         type: "",
  //   //         msg: state.msg,
  //   //         image:
  //   //           "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
  //   //       });
  //   //       setState({ chat: [...chatItms] });
  //   //       scrollToBottom();
  //   //       setState({ msg: "" });
  //   //     }
  //   //   }
  //   // });
  //   scrollToBottom();
  // }
  const onStateChange = (e) => {
    setMess(e.target.value);
  };

  const handleSendMessage = async () => {
    if (mess === "") return;
    try {
      const messageData = {
        conversationId: conversationInfo._id,
        senderId: user._id,
        text: mess,
      };
      dispatch(addMessage(messageData));
      setMess("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main__chatcontent">
      <div className="content__header">
        <div className="blocks">
          {conversationInfo ? (
            <div className="current-chatting-user">
              <Avatar
                className="current-chatting-avt"
                isOnline="active"
                image={
                  conversationInfo?.members[0]._id === user._id
                    ? conversationInfo.members[1].avatarUrl
                    : conversationInfo.members[0].avatarUrl
                }
              />
              <p>
                {conversationInfo?.members[0]._id === user._id
                  ? conversationInfo.members[1].name
                  : conversationInfo.members[0].name}
              </p>
            </div>
          ) : (
            <Typography
              sx={{
                fontSize: "30px",
                opacity: "0.5",
                display: "flex",
                flexDirection: "row",
              }}
            >
              {" "}
              <AddIcon
                fontSize="large"
                sx={{
                  display: "flex",
                  alignSelf: "center",
                  flexDirection: "row",
                }}
              />
              Choose a new conversation
            </Typography>
          )}
        </div>
        <div className="blocks">
          <div className="settings">
            <button className="btn-nobg">
              <i className="fa fa-cog"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="content__body">
        <div className="chat__items">
          {messages?.map((message, index) => (
            <ChatItem
              animationDelay={index + 1}
              key={index}
              user={message?.senderId === user._id ? "me" : "other"}
              msg={message?.text}
              createdAt={message?.createdAt}
              image={
                conversationInfo?.members[0]._id === user._id
                  ? conversationInfo?.members[0].avatarUrl
                  : conversationInfo?.members[1].avatarUrl
              }
            />
          ))}

          <div ref={messagesEndRef} />
        </div>
      </div>
     {conversationInfo ? <div className="content__footer">
        <div className="sendNewMessage">
          <button className="addFiles">
            <AddToPhotosIcon />
          </button>
          <input
            
            placeholder="Type a message here"
            onChange={onStateChange}
            value={mess}
          />
          <button
            onClick={handleSendMessage}
            className="btnSendMsg"
            id="sendMsgBtn"
          >
            <SendIcon />
          </button>
        </div>
      </div>: ""} 
    </div>
  );
};

export default ChatContent;
