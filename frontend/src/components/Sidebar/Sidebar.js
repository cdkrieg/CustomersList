import { CDBSidebar, CDBSidebarHeader, CDBSidebarMenuItem } from "cdbreact";
import React, { useContext, useEffect, useState } from "react";

import AuthContext from "../../context/AuthContext";
import { MdMenu } from "react-icons/md";

const Sidebar = ({ showMenu, setShowMenu }) => {
  const { user } = useContext(AuthContext);

  useEffect(() => {}, []);

  return (
      <CDBSidebar textColor='#fff' backgroundColor='rgb(51, 59, 65)'>
        <CDBSidebarHeader prefix={<i className='fa fa-large'></i>}>
          <MdMenu className='material-icons'
            onClick={() => setShowMenu(!showMenu)}
          />
        </CDBSidebarHeader>

        <CDBSidebarMenuItem className="sidebarMenu">
          View/Edit Profile
        </CDBSidebarMenuItem>
        <hr />

        <CDBSidebarMenuItem className="sidebarMenu">
          Add Contractor/Review
        </CDBSidebarMenuItem>
        <hr />

        <CDBSidebarMenuItem className="sidebarMenu">
          View/Edit "My Reviews"
        </CDBSidebarMenuItem>
        <hr />
        <CDBSidebarMenuItem className="sidebarMenu">
          Request Contractor Access
        </CDBSidebarMenuItem>
        <hr />
        <CDBSidebarMenuItem className="sidebarMenu">
          Contact Support
        </CDBSidebarMenuItem>
      </CDBSidebar>
  );
};

export default Sidebar;
