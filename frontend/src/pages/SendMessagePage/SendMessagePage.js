import React, { useEffect, useContext } from "react";
import { useLocation } from "react-router";

import AxiosMessages from "../../Routes/messagesRoutes";
import AuthContext from "../../context/AuthContext";
import MessageForm from "../../components/Message/MessageForm";

const SendMessagePage = () => {
  const location = useLocation();
  const { receiver, messageToReply } = location.state;
  const { user } = useContext(AuthContext);
  const sendMessage = async (message) => {
    try {
      let messagePost = await AxiosMessages.postMessage(message);
      if (messagePost) {
        return messagePost;
      }
    } catch (error) {
      console.log(`Error posting message`);
    }
  };

  useEffect(() => {
    console.log(location.state);
  }, []);

  return (
    <div>
      <MessageForm
        sendMessage={sendMessage}
        receiver={receiver}
        messageToReply={messageToReply}
        user={user}
      />
    </div>
  );
};

export default SendMessagePage;
