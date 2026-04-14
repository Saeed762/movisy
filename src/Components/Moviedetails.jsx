import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Style/details.css";
import MovActors from "./MovActors";
const API_KEY = import.meta.env.VITE_API_KEY;
export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`,
      );

      const data = await res.json();
      setMovie(data);
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="details-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>

      <div className="details-container">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="details-img"
        />
        <div className="details-info">
          <h1>{movie.title}</h1>

          <p className="rating">⭐ {movie.vote_average.toFixed(1)}</p>

          <p className="date">📅 {movie.release_date}</p>

          <p className="desc">{movie.overview}</p>
        </div>
      </div>
      <MovActors id={movie.id} />
    </div>
  );
}
