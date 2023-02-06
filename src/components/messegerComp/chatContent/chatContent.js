import React, { Component, useState, createRef, useEffect } from "react";

import "./chatContent.css";
import Avatar from "../chatList/Avatar";
import ChatItem from "./chatItems";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../../hooks/useAuth";
import { addMessage } from "../../../features/message/messageSlice";

const ChatContent = () => {
  const {user} = useAuth()
  const [mess, setMess] = useState("")
  const messagesEndRef = createRef(null);
const dispatch = useDispatch()
  const {convId} = useSelector(
    (state) => state.message
  );
  const { currentPageMessage, messagesById } = useSelector(
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

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  function componentDidMount() {
      // window.addEventListener("keydown", (e) => {
      //   if (e.keyCode == 13) {
      //     if (state.msg != "") {
      //       chatItms.push({
      //         key: 1,
      //         type: "",
      //         msg: state.msg,
      //         image:
      //           "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
      //       });
      //       setState({ chat: [...chatItms] });
      //       scrollToBottom();
      //       setState({ msg: "" });
      //     }
      //   }
      // });
      scrollToBottom();
  }
  const onStateChange = (e) => {
    // setState({ msg: e.target.value });
    setMess(e.target.value)
    
  };

  const handleSendMessage = async () => {
    try {
      const messageData = {
        conversationId: convId,
        senderId: user._id,
        text: mess,
      };
      dispatch(addMessage(messageData));
      setMess("")
    } catch (error) {
      console.log(error);
    }
  }

  

  return (
    <div className="main__chatcontent">
      <div className="content__header">
        <div className="blocks">
          <div className="current-chatting-user">
            <Avatar
              isOnline="active"
              image="https://images.unsplash.com/photo-1671726805228-dc54c08408ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8aG9tZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            />
            <p>Tim Hover</p>
          </div>
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
              animationDelay={index+1}
              key={index}
              user={message?.senderId === user._id ? "me" : "other"}
              msg={message?.text}
              image="https://images.unsplash.com/photo-1671726805228-dc54c08408ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8aG9tZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            />
          ))}

          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="content__footer">
        <div className="sendNewMessage">
          <button className="addFiles">
            <i className="fa fa-plus"></i>
          </button>
          <input
            type="text"
            placeholder="Type a message here"
            onChange={onStateChange}
            value={mess}
          />
          <button onClick={handleSendMessage} className="btnSendMsg" id="sendMsgBtn">
            <i className="fa fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatContent;