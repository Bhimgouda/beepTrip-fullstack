import React from "react";
import { Link } from "react-router-dom";
import Logout from "./../pages/logout";

const Navbar = ({ user, updateUser }) => {
  return (
    <nav className="navbar sticky-top navbar-dark navbar-expand-lg bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          BeepCamp
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/campgrounds">
              Campgrounds
            </Link>
            <Link className="nav-link" to="campgrounds/new">
              Add Campground
            </Link>
          </div>
          <div className="navbar-nav mr-auto">
            {!user.username && (
              <React.Fragment>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </React.Fragment>
            )}
            {user.username && <Logout updateUser={updateUser} />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
