import React, { useEffect, useContext } from "react";
import { CDBSidebar, CDBSidebarMenuItem } from "cdbreact";
import { NavLink } from "react-router-dom";
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
        <NavLink to='/' onClick={() => setShowMenu(!showMenu)}>
          Home
        </NavLink>
      </CDBSidebarMenuItem>
      <hr />
      <CDBSidebarMenuItem className='sidebarMenu'>
        <NavLink to='/profile' onClick={() => setShowMenu(!showMenu)}>
          View/Edit Profile
        </NavLink>
      </CDBSidebarMenuItem>
      <hr />

      <CDBSidebarMenuItem className='sidebarMenu'>
        <NavLink to='/addReviews' onClick={() => setShowMenu(!showMenu)}>
          Add Contractor/Review
        </NavLink>
      </CDBSidebarMenuItem>
      <hr />

      <CDBSidebarMenuItem className='sidebarMenu'>
        <NavLink to='/reviews' onClick={() => setShowMenu(!showMenu)}>
          View/Add "My Reviews"
        </NavLink>
      </CDBSidebarMenuItem>
      <hr />
      <CDBSidebarMenuItem className='sidebarMenu'>
        <NavLink to='/messages' onClick={() => setShowMenu(!showMenu)}>
          View Messages 
        </NavLink>
      </CDBSidebarMenuItem>
      <hr />
      <CDBSidebarMenuItem className='sidebarMenu'>
        Request Contractor Access
      </CDBSidebarMenuItem>
      <hr />
      <CDBSidebarMenuItem className='sidebarMenu'>
      <NavLink to='/sendMessage' state={{webMaster: {id: webMaster.id, userName: webMaster.userName}}} onClick={() => setShowMenu(!showMenu)}>
        Contact Support
        </NavLink>
      </CDBSidebarMenuItem>
    </CDBSidebar>
  );
};

export default Sidebar;
