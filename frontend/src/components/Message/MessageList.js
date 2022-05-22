import React, { useState, useEffect } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { Link } from 'react-router-dom';

const MessageList = ({
  messages,
  updateMessage,
  setMessages,
  getUserMessages,
  user,
  sendMessageToUser
}) => {
  const [checked, setChecked] = useState();
  const formatDate = (date) => {
    let temp = new Date(date);
    temp = temp.toLocaleDateString();
    return temp;
  }

  const handleChecked = async (message, index) => {
    let temp = await updateMessage(message._id, { flagged: !message.flagged });
    let newArray = checked;
    newArray[index] = temp.flagged;
    setChecked(newArray);
    let temp2 = await getUserMessages(user._id);
    setMessages(temp2);
  };

  useEffect(() => {
    setChecked(
      messages.map((message) => {
        return message.flagged;
      })
    );
  }, [messages]);

  return (
    <div>
      <p></p>
      {messages && checked && (
        <Table variant='dark'>
          {messages.map((message, index) => {
            return (
              <tbody key={index}>
                <tr>
                  <td>From: {message.senderUserName}</td>
                  <td>To: {message.receiverUserName}</td>
                  <td>Review: {message.reviewTitle}</td>
                </tr>
                <tr>
                  <td>Read: {message.read && "yes"}</td>
                  <td>Date Sent: {formatDate(message.dateSent)}</td>
                  <td>
                    <Form.Check
                      type='checkbox'
                      label='Flag message'
                      checked={checked[index]} // initially checked[index] = true and checkbox is 'checked'. doesn't update to 'not checked' when checked = [false] until reload
                      onChange={() => {
                        handleChecked(message, index);
                      }}
                    />
                  </td>
                </tr>

                <tr>
                  <td colSpan={3}>{message.message}</td>
                  
                </tr>
                <tr>
                    <td colSpan={3}>
                  <Link to="/sendMessage" state= {{receiver:{userName: message.senderUserName, id: message.senderId}, messageToReply:{title: message.reviewTitle, id: message.reviewId }}}>Reply</Link>
                  </td>
                </tr>
                
              </tbody>
            );
          })}
        </Table>
      )}
    </div>
  );
};

export default MessageList;
