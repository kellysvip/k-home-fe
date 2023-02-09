import React, { Component, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../../../features/conversation/conversationSlice";
import { getMessages } from "../../../features/message/messageSlice";
import useAuth from "../../../hooks/useAuth";
import "./chatList.css";
import ChatListItems from "./chatListItem";

const ChatList = () => {
  const { user } = useAuth();
  const userId = user._id;
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.post);
  const ownPostId = products?.author._id;

  const { conversation } = useSelector((state) => state.conversation);
  const handleOpenConversation = (conversationId) => {
    console.log(conversationId);
    dispatch(getMessages({ conversationId }));
  };

  useEffect(() => {
    try {
      dispatch(getConversations({ userId, ownPostId }));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, ownPostId, userId]);

  return (
    <div className="main__chatlist">
      <div className="chatlist__heading">
        <h2>Chats</h2>
        <button className="btn-nobg">
          <i className="fa fa-ellipsis-h"></i>
        </button>
      </div>
      <div className="chatList__search">
        <div className="search_wrap">
          <input type="text" placeholder="Search Here" required />
          <button className="search-btn">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
      <div className="chatlist__items">
        {conversation?.map((conv, index) => (
          <div onClick={() => handleOpenConversation(conv._id)}>
            <ChatListItems
              name={
                conv.members[0]?._id === userId
                  ? conv.members[1]?.name
                  : conv.members[0]?.name
              }
              key={index + 1}
              animationDelay={index + 1}
              active="active"
              isOnline="active"
              image={
                conv.members[0]?._id === userId
                  ? conv.members[1]?.avatarUrl
                  : conv.members[0]?.avatarUrl
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default ChatList;
