import "./Navbar.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdMenu } from "react-icons/md";

const Navbar = ({showMenu, setShowMenu}) => {


  return (
    <div className='navBar'>
      <p className='brand'>
        <Link className="brandLink"
          to='/'
         >
          <b>
            The{" "}
            <span>
              Customer's 
            </span>
             {" "}List
          </b>
        </Link>
      </p>

      <div className='navbar-second-line'>
       
        <p>A contractor review website for customers, by customers.</p>
        <div className="hamburger">
        {!showMenu && <button onClick={()=>setShowMenu(!showMenu)}><MdMenu className='material-icons' /></button>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
