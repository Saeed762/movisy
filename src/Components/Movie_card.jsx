import star from "../assets/Images/star.png";
import "../Style/movie-card.css";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
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

  return (
    <div className="movie_card" onClick={() => navigate(`/movie/${id}`)}>
      <FaHeart
        className={`heart ${isFavorite ? "active" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          if (isFavorite) remove(id);
          else add({ id, name, image, description, rate, date });
        }}
      />

      {/* الصورة */}
      <img
        src={`https://image.tmdb.org/t/p/w500${image}`}
        className="movie_poster"
      />

      {/* التفاصيل */}
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
    </div>
  );
}
