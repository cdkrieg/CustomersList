import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Form, Button } from "react-bootstrap";

const ImageUpload = ({ id, uploadImage, setShow }) => {
  const [newImage, setNewImage] = useState({ image: "" });
  const handlePhoto = (event) => {
    setNewImage({ image: event.target.files[0] });
  };
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (newImage.image === ""){
      return
    }
    const formData = new FormData();
    formData.append("image", newImage.image);
    uploadImage(id, formData);
    setShow(false);
    navigate("/");
  };

  return (
    <div className='image-container'>
      <Form
        className='image-style'
        onSubmit={handleSubmit}
        encType='multipart/form-data'>
        <Form.Control
          type='file'
          accept='.png,.jpg,.jpeg'
          name='image'
          onChange={handlePhoto}
        />
        <Button type='submit'>Upload/Change Profile Image</Button>
      </Form>
    </div>
  );
};
export default ImageUpload;
