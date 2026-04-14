import { useEffect, useRef, useState } from "react";
import star from "../assets/Images/star.png";
import "../Style/movie-card.css";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";

const GENRE_MAP = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};
export function MovieCard({
  name,
  image,
  description,
  rate,
  date,
  genreIds = [],
  id,
  add,
  remove,
  favList = [],
}) {
  const navigate = useNavigate();
  const isFavorite = favList.some((movie) => movie.id === id);
  const enterTimer = useRef(null);
  const idleTimer = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });
  const movieGenres = genreIds
    .map((genreId) => GENRE_MAP[genreId])
    .filter(Boolean)
    .slice(0, 2)
    .join(", ");

  useEffect(() => {
    return () => {
      if (enterTimer.current) clearTimeout(enterTimer.current);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  const isDesktop = () => window.innerWidth >= 768;

  const hidePopup = () => {
    if (enterTimer.current) clearTimeout(enterTimer.current);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    setShowPopup(false);
  };

  const setPopupFromMouse = (event) => {
    const popupWidth = 220;
    const popupHeight = 180;
    const offsetX = 28;
    const offsetY = -10;
    let nextX = event.clientX + offsetX;
    let nextY = event.clientY + offsetY;

    if (nextX + popupWidth > window.innerWidth - 8) {
      nextX = event.clientX - popupWidth - 20;
    }

    if (nextY + popupHeight > window.innerHeight - 8) {
      nextY = window.innerHeight - popupHeight - 8;
    }

    if (nextY < 8) nextY = 8;

    setPopupPos({
      x: nextX,
      y: nextY,
    });
  };

  return (
    <div
      className="movie_card"
      onClick={() => navigate(`/movie/${id}`)}
      onMouseEnter={(event) => {
        if (!isDesktop()) return;
        if (enterTimer.current) clearTimeout(enterTimer.current);
        setPopupFromMouse(event);
        enterTimer.current = setTimeout(() => setShowPopup(true), 900);
      }}
      onMouseMove={(event) => {
        if (!isDesktop()) return;
        if (enterTimer.current) clearTimeout(enterTimer.current);
        if (idleTimer.current) clearTimeout(idleTimer.current);
        if (showPopup) setShowPopup(false);
      }}
      onMouseLeave={hidePopup}
    >
      <FaHeart
        className={`heart ${isFavorite ? "active" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          if (isFavorite) remove(id);
          else add({ id, name, image, description, rate, date });
        }}
      />
      <img
        src={`https://image.tmdb.org/t/p/w500${image}`}
        className="movie_poster"
      />
      <div className="movie_details">
        <h3 className="movie_details_heading">{name}</h3>

        <div className="movie_date_rate">
          <p>{date}</p>
          <p>
            {rate} <img src={star} className="card_emoji" />
          </p>
        </div>

        <p className="movie_description">{description}</p>
      </div>
      {showPopup &&
        createPortal(
          <div
            className="movie_hover_popup_global"
            style={{ left: `${popupPos.x}px`, top: `${popupPos.y}px` }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${image}`}
              alt={name}
              className="popup_img"
            />
            <div className="popup_info">
              <h4>{name}</h4>
              <p>📅 {date || "N/A"}</p>
              <p>rate: ⭐ {rate}</p>
              <p>genre: {movieGenres || "Unknown"}</p>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
