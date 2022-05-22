import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router";
import useCustomForm from "../../hooks/UseCustomForm";

const MessageForm = ({
  messageToReply,
  user,
  receiver,
  sendMessage,
}) => {
    const navigate = useNavigate()

    const [showAlert, setShowAlert] = useState(false)

  const defaultValues = {
    senderId: user._id,
    senderUserName: user.userName,
    receiverId: receiver.id,
    receiverUserName: receiver.userName,
    message: "",
    reviewId: messageToReply.id,
    reviewTitle: messageToReply.title,
  };

  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    defaultValues,
    sendMessage
  );

    const customSubmit = (e) => {
        e.preventDefault()
        handleSubmit(e)
        setShowAlert(true)
        setTimeout(() => {
            setShowAlert(false)
            reset()
            navigate(-1)

        }, 1000);

    }
  useEffect(() => {

  
  }, [])
  

  return <div>
      <Form  className="form" onSubmit={(e)=> customSubmit(e)}>
          <Form.Control type="textarea" name="message" value={formData.message} onChange={handleInputChange} placeholder="Enter your message"/>
          <br/>
          {showAlert && <Alert>Message sent!</Alert>}
          <Button type="submit" variant="dark" id="submitButton">Submit</Button>
          <Button type="reset" variant="dark" id="cancelButton" onClick={()=> navigate(-1)}>Cancel</Button>
      </Form>
  </div>;
};

export default MessageForm;
