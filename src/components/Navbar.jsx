"use client";

import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Briefcase,
  Users,
  MessageSquare,
  Bell,
  User,
} from "react-feather";

function Navbar({ onLogout }) {
  const location = useLocation();

  return (
    <nav className="navbar linkedin-navbar fixed-top">
      <div className="container">
        <div className="d-flex align-items-center">
          <Link className="navbar-brand me-3" to="/home">
            <div className="linkedin-logo">in</div>
          </Link>

          <div className="d-none d-md-block">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              style={{
                width: "280px",
                backgroundColor: "#eef3f8",
                borderRadius: "4px",
              }}
            />
          </div>
        </div>

        <div className="d-flex justify-content-between flex-grow-1 d-md-none mx-2">
          <Link
            className={`nav-icon text-decoration-none ${
              location.pathname === "/home" ? "active" : ""
            }`}
            to="/home"
          >
            <Home size={22} />
            <span>Home</span>
          </Link>

          <Link
            className={`nav-icon text-decoration-none ${
              location.pathname === "/connections" ? "active" : ""
            }`}
            to="/connections"
          >
            <Users size={22} />
            <span>Network</span>
          </Link>

          <Link
            className={`nav-icon text-decoration-none ${
              location.pathname === "/jobs" ? "active" : ""
            }`}
            to="/jobs"
          >
            <Briefcase size={22} />
            <span>Jobs</span>
          </Link>

          <Link className="nav-icon text-decoration-none" to="#">
            <MessageSquare size={22} />
            <span>Messages</span>
          </Link>

          <Link
            className={`nav-icon text-decoration-none ${
              location.pathname.includes("/profile") ? "active" : ""
            }`}
            to="/profile/johndoe"
          >
            <User size={22} />
            <span>Me</span>
          </Link>
        </div>

        <div className="d-none d-md-flex">
          <Link
            className={`nav-icon mx-3 text-decoration-none ${
              location.pathname === "/home" ? "active" : ""
            }`}
            to="/home"
          >
            <Home size={22} />
            <span>Home</span>
          </Link>

          <Link
            className={`nav-icon mx-3 text-decoration-none ${
              location.pathname === "/connections" ? "active" : ""
            }`}
            to="/connections"
          >
            <Users size={22} />
            <span>My Network</span>
          </Link>

          <Link
            className={`nav-icon mx-3 text-decoration-none ${
              location.pathname === "/jobs" ? "active" : ""
            }`}
            to="/jobs"
          >
            <Briefcase size={22} />
            <span>Jobs</span>
          </Link>

          <Link className="nav-icon mx-3 text-decoration-none" to="#">
            <MessageSquare size={22} />
            <span>Messaging</span>
          </Link>

          <Link className="nav-icon mx-3 text-decoration-none" to="#">
            <Bell size={22} />
            <span>Notifications</span>
          </Link>

          <Link
            className={`nav-icon mx-3 text-decoration-none ${
              location.pathname.includes("/profile") ? "active" : ""
            }`}
            to="/profile/johndoe"
          >
            <User size={22} />
            <span>Me</span>
          </Link>

          {/* <button
            className="btn btn-sm btn-outline-danger ms-3 d-none d-lg-block newcard1"
            onClick={onLogout}
            style={{ height: "fit-content" }}
          >
            Logout
          </button> */}
          <button
            className="btn btn-sm btn-outline-danger ms-3 d-block newcard1"
            onClick={onLogout}
            style={{ height: "fit-content" }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
