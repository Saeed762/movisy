import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import star from "../assets/Images/star.png";
import "../Style/movie-card.css";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
  const [showPopup, setShowPopup] = useState(false);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });
  const showTimer = useRef(null);
  const hideTimer = useRef(null);
  const genres = genreIds
    .map((idValue) => GENRE_MAP[idValue])
    .filter(Boolean)
    .slice(0, 2)
    .join(", ");

  useEffect(() => {
    return () => {
      if (showTimer.current) clearTimeout(showTimer.current);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  const isDesktop = () => window.innerWidth >= 992;

  const clearTimers = () => {
    if (showTimer.current) clearTimeout(showTimer.current);
    if (hideTimer.current) clearTimeout(hideTimer.current);
  };

  const setPopupNearMouse = (event) => {
    const popupWidth = 220;
    const popupHeight = 190;
    const margin = 8;
    let x = event.clientX + 20;
    let y = event.clientY - 14;

    if (x + popupWidth > window.innerWidth - margin) {
      x = event.clientX - popupWidth - 20;
    }
    if (y + popupHeight > window.innerHeight - margin) {
      y = window.innerHeight - popupHeight - margin;
    }
    if (y < margin) y = margin;
    if (x < margin) x = margin;

    setPopupPos({ x, y });
  };

  const scheduleShow = () => {
    if (!isDesktop()) return;
    if (showTimer.current) clearTimeout(showTimer.current);
    showTimer.current = setTimeout(() => {
      setShowPopup(true);
    }, 2000);
  };

  return (
    <div
      className="movie_card"
      onClick={() => navigate(`/movie/${id}`)}
      onMouseEnter={(event) => {
        if (!isDesktop()) return;
        clearTimers();
        setPopupNearMouse(event);
        scheduleShow();
      }}
      onMouseMove={(event) => {
        if (!isDesktop()) return;
        clearTimers();
        if (showPopup) {
          hideTimer.current = setTimeout(() => {
            setShowPopup(false);
          }, 260);
        }
        setPopupNearMouse(event);
        scheduleShow();
      }}
      onMouseLeave={() => {
        clearTimers();
        setShowPopup(false);
      }}
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
              <p>genre: {genres || "Unknown"}</p>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
