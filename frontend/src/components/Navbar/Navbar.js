import "./Navbar.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdMenu } from "react-icons/md";

const Navbar = ({showMenu, setShowMenu}) => {


  return (
    <div className='navBar'>
      <p className='brand'>
        <Link
          to='/'
          style={{
            textDecoration: "none",
            color: "white",
            textTransform: "uppercase",
          }}>
          <b>
            The{" "}
            <span style={{ color: "steelblue", fontStyle: "italic" }}>
              Customer's
            </span>
            <span> List</span>
          </b>
        </Link>
      </p>

      <div className='navbar-second-line'>
        {!showMenu && <button onClick={()=>setShowMenu(!showMenu)}><MdMenu className='material-icons' /></button>}
        <p>A contractor review website for customers, by customers.</p>
      </div>
    </div>
  );
};

export default Navbar;
