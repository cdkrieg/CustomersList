import { CDBSidebar, CDBSidebarMenuItem } from "cdbreact";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import AuthContext from "../../context/AuthContext";
import { MdMenu } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Sidebar = ({ showMenu, setShowMenu }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <CDBSidebar
      id='sidebar'
      textColor='#fff'
      backgroundColor='rgb(51, 59, 65)'
      style={{
        display: "block",
        height: "55vh",
        marginTop: "-15px",
        position: "relative",
        fontSize: "1em",
        paddingTop: "0",
        textAlign: "center",
        minWidth: "390px",
      }}>
      <CDBSidebarMenuItem className='sidebarMenu'>
        <NavLink to='/profile' onClick={() => setShowMenu(!showMenu)}>
          View/Edit Profile
        </NavLink>
      </CDBSidebarMenuItem>
      <hr />

      <CDBSidebarMenuItem className='sidebarMenu'>
        <NavLink to='/addReviews'onClick={() => setShowMenu(!showMenu)}>
        Add Contractor/Review
        </NavLink>
      </CDBSidebarMenuItem>
      <hr />

      <CDBSidebarMenuItem className='sidebarMenu'>
      <NavLink to='/reviews'onClick={() => setShowMenu(!showMenu)}>
        View/Edit "My Reviews"
        </NavLink>
      </CDBSidebarMenuItem>
      <hr />
      <CDBSidebarMenuItem className='sidebarMenu'>
        Request Contractor Access
      </CDBSidebarMenuItem>
      <hr />
      <CDBSidebarMenuItem className='sidebarMenu'>
        Contact Support
      </CDBSidebarMenuItem>
    </CDBSidebar>
  );
};

export default Sidebar;
