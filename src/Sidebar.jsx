import React, { useState, useRef } from "react";
import "./Sidebar.css";

// Icon imports
import { FaSignInAlt, FaUserPlus, FaUserCircle, FaPlus, FaAngleLeft, FaAngleRight } from "react-icons/fa";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const hoverTimer = useRef(null);

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
          <button><FaSignInAlt /></button>
          <button><FaUserPlus /> </button>
          <button><FaUserCircle /> </button>
          <button><FaPlus /></button>
        </>
      )}
      <button className="collapse-button" onClick={toggleCollapse}>
        {isCollapsed ? <FaAngleRight /> : <FaAngleLeft />}
      </button>
    </div>
  );
}
