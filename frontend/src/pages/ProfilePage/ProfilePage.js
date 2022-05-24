import React, { useContext } from "react";

import EditProfile from "../../components/EditProfile/EditProfile";
import AuthContext from "../../context/AuthContext";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import "./ProfilePage.css";

const ProfilePage = () => {
  const {user, uploadImage} = useContext(AuthContext)

  return (
    <div className='container-profilePage'>
      {user && <EditProfile /> }
      {user && <ImageUpload uploadImage={uploadImage} id={user._id} />}
      {!user && <p>User not logged in</p> }
    </div>
  );
};

export default ProfilePage;
