import { CDBSidebar, CDBSidebarHeader, CDBSidebarMenuItem } from "cdbreact";
import React, { useContext, useEffect, useState } from "react";

import AuthContext from "../../context/AuthContext";
import { MdMenu } from "react-icons/md";

const Sidebar = ({showMenu, setShowMenu}) => {
  const { user } = useContext(AuthContext);


  useEffect(() => {

  }, []);

  
    return (
      <div
        style={{
          display: "flex",
          width: "60px",
          height: "100vh",
          overflow: "scroll initial",
          marginTop: "-32px",
          position: "absolute",
          fontSize: "2em",
        }}
      >
        <CDBSidebar textColor="#fff" backgroundColor="rgb(51, 59, 65)">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a
              href="/"
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              <span>
                  <button onClick={()=> setShowMenu(!showMenu)}><MdMenu /></button>
              <h4
                style={{
                  textAlign: "center",
                  fontSize: "1em",
                  margin: "0em 0em 0em 1em",
                  paddingBottom: "0em",
                }}
              >
                {user && user.name}
              </h4></span>
            </a>
          </CDBSidebarHeader>

          <CDBSidebarMenuItem style={{ fontSize: "1rem" }}>
            View/Edit Profile
          </CDBSidebarMenuItem>

          <CDBSidebarMenuItem style={{ fontSize: "1rem" }}>
            Add Contractor/Review
          </CDBSidebarMenuItem>

          <CDBSidebarMenuItem style={{ fontSize: "1rem" }}>
            View/Edit "My Reviews"
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem style={{ fontSize: "1rem" }}>
            Request Contractor Access
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem>Contact Support</CDBSidebarMenuItem>
        </CDBSidebar>
      </div>
    )

};

export default Sidebar;