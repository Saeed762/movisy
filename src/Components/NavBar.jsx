import React from "react";
import "../Style/navbar.css";
import fire from "../assets/Images/fire.png";
import party from "../assets/Images/partying-face.png";
import star from "../assets/Images/star.png";
import SearchBar from "./Search_bar";
import { useNavigate } from "react-router-dom";

export const Navbar = ({ search, setSearch, count }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      {/* الشعار */}
      <h1 onClick={() => navigate("/movie")}>movisy</h1>

      {/* البحث */}
      <SearchBar search={search} setSearch={setSearch} />

      {/* الروابط */}
      <div className="navbar-links">
        <span onClick={() => navigate("/movie/popular")}>
          popular
          <img src={fire} className="navbar-emojis" />
        </span>

        <span onClick={() => navigate("/movie/top-rated")}>
          Top rated
          <img src={party} className="navbar-emojis" />
        </span>

        <span onClick={() => navigate("/movie/upcoming")}>
          upcoming
          <img src={star} className="navbar-emojis" />
        </span>
      </div>

      {/* ❤️ المفضلة */}
      <div className="fav-container" onClick={() => navigate("/favorites")}>
        <span className="heart-icon">❤️</span>

        {count > 0 && <span className="fav-badge">{count}</span>}
      </div>
    </nav>
  );
};

export default Navbar;
