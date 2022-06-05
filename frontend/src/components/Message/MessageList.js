import React, { useState, useEffect } from "react";
import { Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../utils/CommonMethods";
import CommonMethods from "../../utils/CommonMethods";

const MessageList = ({
  messages,
  updateMessage,
  setMessages,
  getUserMessages,
  user,
}) => {
  const [checked, setChecked] = useState();
  const formatDate = (date) => CommonMethods.formatDate(date);

  const handleChecked = async (message, index) => {
    let temp = await updateMessage(message._id, { flagged: !message.flagged });
    let newArray = checked;
    newArray[index] = temp.flagged;
    setChecked(newArray);
    let temp2 = await getUserMessages(user._id);
    setMessages(temp2)
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
      {messages && (
        <Table>
          {messages.reverse().map((message, index) => {
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
                    {checked && <Form.Check
                      type='checkbox'
                      label='Flag message'
                      checked={checked[index]} 
                      onChange={() => {
                        handleChecked(message, index);
                      }}
                    />}
                  </td>
                </tr>
                <tr>
                  <td colSpan={3}>{message.message}</td>
                </tr>
                {message.attachment && (
                  <tr>
                    <td colSpan={3}>{JSON.stringify(message.attachment)}</td>
                  </tr>
                )}

                <tr>
                  <td colSpan={3}>
                    <Link
                      to='/sendMessage'
                      state={{
                        receiver: {
                          userName: message.senderUserName,
                          id: message.senderId,
                        },
                        messageToReply: {
                          title: message.reviewTitle,
                          id: message.reviewId,
                        },
                      }}>
                      Reply
                    </Link>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      )}
      {messages.length === 0 && <p>No Messages to Show!</p>}
    </div>
  );
};

export default MessageList;

