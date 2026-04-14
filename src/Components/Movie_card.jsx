import { useEffect, useRef, useState } from "react";
import star from "../assets/Images/star.png";
import "../Style/movie-card.css";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
export function MovieCard({
  name,
  image,
  description,
  rate,
  date,
  id,
  add,
  remove,
  favList = [],
}) {
  const navigate = useNavigate();
  const isFavorite = favList.some((movie) => movie.id === id);
  const enterTimer = useRef(null);
  const idleTimer = useRef(null);
  const hideTimer = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    return () => {
      if (enterTimer.current) clearTimeout(enterTimer.current);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  const isDesktop = () => window.innerWidth >= 768;

  const hidePopup = () => {
    if (enterTimer.current) clearTimeout(enterTimer.current);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    if (hideTimer.current) clearTimeout(hideTimer.current);
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

  const schedulePopup = (event) => {
    if (!isDesktop()) return;
    setPopupFromMouse(event);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setShowPopup(true), 700);
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
        if (hideTimer.current) clearTimeout(hideTimer.current);
        if (showPopup) {
          hideTimer.current = setTimeout(() => setShowPopup(false), 220);
        }
        schedulePopup(event);
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
              <p>التقييم: ⭐ {rate}</p>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
