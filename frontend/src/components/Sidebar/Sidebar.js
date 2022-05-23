import React, { useEffect, useContext } from "react";
import { CDBSidebar, CDBSidebarMenuItem } from "cdbreact";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const Sidebar = ({ showMenu, setShowMenu }) => {
  const {webMaster} = useContext(AuthContext)
  useEffect(() => {}, []);

  return (
    <CDBSidebar
      id='sidebar'
      textColor='#fff'
      backgroundColor='rgb(51, 59, 65)'
      style={{
        display: "block",
        height: "70vh",
        marginTop: "-15px",
        position: "relative",
        fontSize: "1em",
        paddingTop: "0",
        textAlign: "center",
        minWidth: "390px",
      }}>
      <CDBSidebarMenuItem className='sidebarMenu'>
        <Link to='/' onClick={() => setShowMenu(!showMenu)}>
          Home
        </Link>
      </CDBSidebarMenuItem>
      <hr />
      <CDBSidebarMenuItem className='sidebarMenu'>
        <Link to='/profile' onClick={() => setShowMenu(!showMenu)}>
          View/Edit Profile
        </Link>
      </CDBSidebarMenuItem>
      <hr />

      <CDBSidebarMenuItem className='sidebarMenu'>
        <Link to='/addReviews' onClick={() => setShowMenu(!showMenu)}>
          Add Contractor/Review
        </Link>
      </CDBSidebarMenuItem>
      <hr />

      <CDBSidebarMenuItem className='sidebarMenu'>
        <Link to='/reviews' onClick={() => setShowMenu(!showMenu)}>
          View/Add "My Reviews"
        </Link>
      </CDBSidebarMenuItem>
      <hr />
      <CDBSidebarMenuItem className='sidebarMenu'>
        <Link to='/messages' onClick={() => setShowMenu(!showMenu)}>
          View Messages 
        </Link>
      </CDBSidebarMenuItem>
      <hr />
      <CDBSidebarMenuItem className='sidebarMenu'>
        Request Contractor Access
      </CDBSidebarMenuItem>
      <hr />
      <CDBSidebarMenuItem className='sidebarMenu'>
      <Link to='/sendMessage' state={{webMaster: {id: webMaster.id, userName: webMaster.userName}}} onClick={() => setShowMenu(!showMenu)}>
        Contact Support
        </Link>
      </CDBSidebarMenuItem>
    </CDBSidebar>
  );
};

export default Sidebar;
