import { useState, useEffect } from "react";
import "../Style/movActor.css";

export default function MovActors({ id }) {
  const [cast, setCast] = useState([]);
  const [count, setCount] = useState(7);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [director, setDirector] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`,
      );

      const data = await res.json();

      // 🎭 cast
      setCast(data.cast);

      // 🎬 director
      const dir = data.crew.find((p) => p.job === "Director");
      setDirector(dir || null);
    };

    fetchData();
  }, [id]);

  return (
    <div className="cast-container">
      {/* 🔢 اختيار العدد */}
      <div className="search-container">
        <select
          className="search-input"
          onChange={(e) => setCount(Number(e.target.value))}
        >
          <option value={7}>7</option>
          <option value={14}>14</option>
          <option value={21}>21</option>
        </select>
      </div>

      {/* 🎬 المخرج */}
      {director && (
        <div className="director-card">
          <img
            src={
              director.profile_path
                ? `https://image.tmdb.org/t/p/w200${director.profile_path}`
                : "https://via.placeholder.com/150"
            }
            alt={director.name}
          />

          <div className="director-info">
            <p className="director-name">{director.name}</p>
          </div>
        </div>
      )}

      {/* 🎭 الممثلين */}
      <h2 className="cast-title">🎭 Cast</h2>

      <div className="cast-list">
        {cast.slice(0, count).map((actor) => (
          <div key={actor.id} className="actor-card">
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : "https://via.placeholder.com/200x300"
              }
              alt={actor.name}
            />

            <div className="actor-info">
              <p className="actor-name">{actor.name}</p>
              <p className="actor-role">{actor.character}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
