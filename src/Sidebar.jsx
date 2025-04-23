import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

// Icon imports
import {
  FaSignInAlt,
  FaUserPlus,
  FaUserCircle,
  FaPlus,
  FaAngleLeft,
  FaAngleRight
} from "react-icons/fa";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const hoverTimer = useRef(null);
  const navigate = useNavigate();

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleMouseEnter = () => {
    if (isCollapsed) {
      hoverTimer.current = setTimeout(() => {
        setIsCollapsed(false);
      }, 500);
    }
  };

  const handleMouseLeave = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
    }
  };

  return (
    <div
      className={`sidebar ${isCollapsed ? "collapsed" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {!isCollapsed && (
        <>
          <button onClick={() => navigate("/login")}><FaSignInAlt /> Login</button>
          <button onClick={() => navigate("/register")}><FaUserPlus /> Register</button>
          <button onClick={() => navigate("/my")}> <FaUserCircle /> My Page</button>
          <button onClick={() => navigate("/new")}><FaPlus /> New</button>
          <button onClick={() => navigate("/route")}>🗺️ Route Planner</button>

        </>
      )}
      <button className="collapse-button" onClick={toggleCollapse}>
        {isCollapsed ? <FaAngleRight /> : <FaAngleLeft />}
      </button>
    </div>
  );
}
