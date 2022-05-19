import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Dropdown } from "react-bootstrap";

import ReviewsList from "../../components/Reviews/ReviewsList";
import "./HomePage.css";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className='container-homePage'>
      <p>Welcome, {user.userName} </p>
      <Dropdown className='dropdown'>
        <Dropdown.Toggle variant='dark'>Select Filters</Dropdown.Toggle>
        <Dropdown.Menu variant='dark'>
          <Dropdown.Item>Item 1</Dropdown.Item>
          <Dropdown.Item>Item 2</Dropdown.Item>
          <Dropdown.Item>Item 3</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <ReviewsList />
    </div>
  );
};

export default HomePage;
