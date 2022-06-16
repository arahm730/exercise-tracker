import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="link-container">
      <div className="link-div">
        <Link to="/">Home</Link>
      </div>
      <div className="link-div">
        <Link to="/create-exercise">Add</Link>
      </div>
    </nav>
  );
}

export default Navigation;
