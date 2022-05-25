import React from "react";
import ImageUpload from "./ImageUpload";

const UploadPhoto = ({ id, uploadImage, title, currentImage, setShow }) => {
  return (
    <div>
      <p>Change/Upload {title} Photo</p>
      {currentImage && (
        <>
          <h4>Current Photo</h4>
          <img
            src={`http://localhost:3010/uploads/images/${currentImage}`}
            alt={title}
          />
        </>
      )}
      <h4>New Photo</h4>
      <ImageUpload
        id={id}
        uploadImage={uploadImage}
        setShow={setShow}
        title={title}
      />
    </div>
  );
};

export default UploadPhoto;
