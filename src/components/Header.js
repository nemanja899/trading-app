import React from "react";
import "../App.css";
export default function Header() {
  return (
    <nav className="navbar">
      <a className="nav-logo" href="#">
        React
      </a>
      <div className="nav-items">
        <a href="#">Home</a>
        <a href="#">About</a>
      </div>
    </nav>
  );
}
