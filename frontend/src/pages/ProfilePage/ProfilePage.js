import React, { useContext, useState } from "react";

import EditProfile from "../../components/EditProfile/EditProfile";
import AuthContext from "../../context/AuthContext";
import UploadPhoto from "../../components/Images/UploadPhoto";
import "./ProfilePage.css";
import { Button } from "react-bootstrap";

const ProfilePage = () => {
  const { user, uploadImage } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const title = "Profile";

  return (
    <div className='container-profilePage'>
      {!show && user && (
        <>
          <EditProfile />
          <Button onClick={() => setShow(true)}>
            Change/Upload Photo
          </Button>{" "}
        </>
      )}

      {show && (
        <UploadPhoto
          uploadImage={uploadImage}
          id={user._id}
          currentImage={user.image}
          title={title}
          setShow={setShow}
        />
      )}
      {!user && <p>User not logged in</p>}
    </div>
  );
};

export default ProfilePage;
