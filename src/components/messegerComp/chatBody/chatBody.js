import React, { Component } from "react";
import ChatContent from "../chatContent/chatContent";
import ChatList from "../chatList/chatList";
import UserProfile from "../userProfile/UserProfile";
import "./chatBody.css";


export default class ChatBody extends Component {
  render() {
    return (
      <div className="main__chatbody">
        <ChatList />
        <ChatContent />
        {/* <UserProfile /> */}
      </div>
    );
  }
}