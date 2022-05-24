import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Form, Button } from "react-bootstrap";
import '../../utils/CommonMethods'


const ImageUpload = ({uploadImage}) => {
  const [newImage, setNewImage] = useState({ image: "" });
  const handlePhoto = (event) => {
    setNewImage({ image: event.target.files[0] });
  };
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", newImage.image);
    uploadImage(formData);
    navigate('/')
  };





  return (
    <div className="image-container">
      <Form
        className="image-style"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <Form.Control
          type="file"
          accept=".png,.jpg,.jpeg"
          name="image"
          onChange={handlePhoto}
        />
        {/* <div className="bg"> </div> */}
        <Button type="submit">Upload/Change Profile Image</Button>
      </Form>
    </div>
  );
};
export default ImageUpload;