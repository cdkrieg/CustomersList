import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MdMenu, MdLogout } from "react-icons/md";
import { Tooltip, OverlayTrigger, Button } from "react-bootstrap";

import AuthContext from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = ({ showMenu, setShowMenu }) => {
  const { logoutUser } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  return (
    <div className='navBar'>
      <p className='brand'>
        <Link className='brandLink' to='/'>
          <b>
            The <span id='customer'>Customer's</span> List
          </b>
        </Link>
      </p>
      {user && (
        <div className='navbar-second-line'>
          <p>A contractor review website for customers, by customers.</p>
          <div className='navBarMenu'>
            <OverlayTrigger
              placement='top'
              delay={{show: 250, hide: 400}}
              overlay={<Tooltip>Click to show/hide menu</Tooltip>}>
              <Button>
                <MdMenu
                  className='material-icons menu'
                  onClick={() => setShowMenu(!showMenu)}
                />
              </Button>
            </OverlayTrigger>
            <label>Logged in: {user && user.userName}</label>
            <OverlayTrigger
              placement='top'
              delay={{show: 250, hide: 400}}
              overlay={<Tooltip>Click to logout</Tooltip>}>
              <Button>
                <MdLogout
                  className='material-icons logout'
                  onClick={() => logoutUser()}
                />
              </Button>
            </OverlayTrigger>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
