import React, { useContext } from "react";
import EditProfile from "../../components/EditProfile/EditProfile";
import AuthContext from "../../context/AuthContext";
import "./ProfilePage.css";

const ProfilePage = () => {
  const {user} = useContext(AuthContext)

  return (
    <div className='container-profilePage'>
      {user && <EditProfile /> }
      {!user && <p>User not logged in</p> }
    </div>
  );
};

export default ProfilePage;
