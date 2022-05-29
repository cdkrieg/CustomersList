import React, { useContext, useState, useEffect } from "react";

import MessageList from "../../components/Message/MessageList";
import AuthContext from "../../context/AuthContext";
import AxiosMessages from "../../Routes/messagesRoutes";
import "./MessagesPage.css";

const MessagesPage = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState();

  useEffect(() => {
    (async () => {
      if (user) {
        try {
          let temp = await getUserMessages(user._id);
          setMessages(temp);
        } catch (error) {
          console.log("Error with setMessages in useEffect");
        }
      }
    })();
  }, []);

  const getUserMessages = async (userId) => {
    try {
      let messageList = await AxiosMessages.getUserMessages(userId);
      if (messageList) {
        return messageList
      } else return "No Messages";
    } catch (error) {
      console.log(`Error getting messages for user`);
    }
  };

  const updateMessage = async (messageId, messageUpdate) => {
    try {
      let message = await AxiosMessages.updateMessage(messageId, messageUpdate);
      if (message) {
        return message;
      }
    } catch (error) {
      console.log(`Error getting messages for user`);
    }
  };

  return (
    <div>
      {messages && (
        <MessageList
          messages={messages}
          updateMessage={updateMessage}
          setMessages={setMessages}
          getUserMessages={getUserMessages}
          user={user}
        />
      )}
    </div>
  );
};

export default MessagesPage;
