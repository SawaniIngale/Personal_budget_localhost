import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();

  const navStyle = {
    background: "#E0DCF2",
    padding: "20px",
  };

  const ulStyle = {
    listStyleType: "none",
    display: "flex",
    margin: "0",
    padding: "10",
    width: "50%", // Make the navbar span the entire width
  };

  const liStyle = {
    flex: "0.5", // Distribute the space evenly among list items
    marginRight: "40px",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#808080",
    fontWeight: "bold",
    fontSize: "16px",
    padding: "10px",
    transition: "color 0.3s ease",
  };

  const activeLinkStyle = {
    color: "#000000",
    borderBottom: "2px solid #000000",
  };

  // const isActive = (path) => {
  //   return [path, "/"].includes(location.pathname);
  // };

  const isActive = (path) => {
    return path === location.pathname;
  };

  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        <li style={liStyle}>
          <NavLink
            to="/home"
            isActive={() => isActive("/home")}
            activeClassName="active"
            style={linkStyle}
          >
            Dashboard
          </NavLink>
        </li>
        <li style={liStyle}>
          <NavLink
            to="/create-budget"
            isActive={() => isActive("/create-budget")}
            activeClassName="active"
            style={linkStyle}
          >
            Create Budget
          </NavLink>
        </li>
        <li style={liStyle}>
          <NavLink
            to="/add-expenses"
            isActive={() => isActive("/add-expenses")}
            activeClassName="active"
            style={linkStyle}
          >
            Add Expenses
          </NavLink>
        </li>
        <li style={liStyle}>
          <NavLink
            to="/"
            isActive={() => isActive("/")}
            activeClassName="active"
            style={linkStyle}
          >
            Log Out
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
