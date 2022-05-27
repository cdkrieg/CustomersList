import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/UseCustomForm";
import AxiosMessages from "../../Routes/messagesRoutes";

const RequestAccess = () => {
    const {user, webMaster} = useContext(AuthContext)
    const navigate = useNavigate()
    const [attachmentValue, setAttachmentValue] = useState({})
    const contractorAccess = async (message) => {
        try {
          let contractorMessage = await AxiosMessages.postMessage(message);
          if (contractorMessage) {
            return contractorMessage;
          }
        } catch (error) {
          console.log(`Error posting message`);
        }
      };

    // {webMaster: {id: webMaster.id, userName: webMaster.userName}}
  const defaultValues = {
    contractorName: "",
    contractorPhone: "",
    contractorEmail: "",
    userEmail: "",
  };
  const formData2 = {
    senderId: user._id,
    senderUserName: user.userName,
    receiverId: webMaster.id,
    receiverUserName: webMaster.userName,
    message: `Request Contractor Access: ${user.userName}  `,
    reviewId: " ",
    reviewTitle: `Contractor Access`,
    attachment: attachmentValue,
  }
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues,
    setAttachmentValue
  );
  const [handleSubmit2] = useCustomForm(
      formData2,
      contractorAccess
  )
  const submit = (e) => {
    e.preventDefault()
    handleSubmit(e)
    handleSubmit()
    navigate('/')
  }

  return (
    <div>
      <Form onSubmit={(event)=>{submit(event)}} onKeyUp={(event)=> {if(event.key === 'Enter')handleSubmit(event)}}>
        <Form.Label>Enter the name of the contractor or business</Form.Label>
        <Form.Control
          name='contractorName'
          value={formData.contractorName}
          onChange={handleInputChange}
        />
        <Form.Label>
          Enter the phone number for the contractor or business
        </Form.Label>
        <Form.Control
          name='contractorPhone'
          value={formData.contractorPhone}
          onChange={handleInputChange}
        />
        <Form.Label>Enter the email for the contractor or business</Form.Label>
        <Form.Control
          name='contractorEmail'
          value={formData.contractorEmail}
          onChange={handleInputChange}
        />
        <Form.Label>Enter the email you use to login to the site</Form.Label>
        <Form.Control
          name='userEmail'
          value={formData.userEmail}
          onChange={handleInputChange}
        />
        <Button type='submit'>Submit</Button>
      </Form>
    </div>
  );
};

export default RequestAccess;
