import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Dropdown } from "react-bootstrap";

import "./HomePage.css";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import ReviewsList from "../../components/Reviews/ReviewsList";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className='container-homePage'>
      <p>Welcome, {user.userName} </p>
      <Dropdown className='dropdown'>
        <DropdownToggle variant='dark'>Select Filters</DropdownToggle>
        <DropdownMenu variant='dark'>
          <DropdownItem>Item 1</DropdownItem>
          <DropdownItem>Item 2</DropdownItem>
          <DropdownItem>Item 3</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <ReviewsList />
    </div>
  );
};

export default HomePage;
