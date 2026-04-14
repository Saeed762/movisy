import React from "react";
import "../Style/navbar.css";
import fire from "../assets/Images/fire.png";
import party from "../assets/Images/partying-face.png";
import star from "../assets/Images/star.png";
import SearchBar from "./Search_bar";
import { NavLink, useNavigate } from "react-router-dom";

export const Navbar = ({ search, setSearch, count }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      {/* الشعار */}
      <h1 onClick={() => navigate("/")}>movisy</h1>

      {/* البحث */}
      <SearchBar search={search} setSearch={setSearch} />

      {/* الروابط */}
      <div className="navbar-links">
        <NavLink
          to="/movie/popular"
          className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}
        >
          popular
          <img src={fire} className="navbar-emojis" />
        </NavLink>

        <NavLink
          to="/movie/top-rated"
          className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}
        >
          Top rated
          <img src={party} className="navbar-emojis" />
        </NavLink>

        <NavLink
          to="/movie/upcoming"
          className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}
        >
          upcoming
          <img src={star} className="navbar-emojis" />
        </NavLink>
      </div>

      {/* ❤️ المفضلة */}
      <NavLink
        to="/favorites"
        className={({ isActive }) =>
          `fav-container ${isActive ? "fav-container-active" : ""}`
        }
      >
        <span className="heart-icon">❤️</span>
        {count > 0 && <span className="fav-badge">{count}</span>}
      </NavLink>
    </nav>
  );
};

export default Navbar;
