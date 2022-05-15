import { CDBSidebar, CDBSidebarHeader, CDBSidebarMenuItem } from "cdbreact";
import React, { useContext, useEffect, useState } from "react";

import AuthContext from "../../context/AuthContext";
import { MdMenu } from "react-icons/md";

const Sidebar = ({ showMenu, setShowMenu }) => {
  const { user } = useContext(AuthContext);

  useEffect(() => {}, []);

  return (
      <CDBSidebar id="sidebar" textColor='#fff' backgroundColor='rgb(51, 59, 65)'
      style={{display: "block",
        height: "55vh",
        marginTop: "-15px",
        position: "relative",
        fontSize: "1em",
        paddingTop: "0",
      textAlign: "center",
    minWidth: "390px"}}
        >
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
