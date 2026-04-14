import { useEffect, useState } from "react";
import { MovieCard } from "./Movie_card";

export default function MoviesSection({
  type,
  title,
  search,
  favList,
  onAddToFavorites,
  onRemoveFromFavorites,
}) {
  const [movies, setMovies] = useState([]);
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    setMovies([]);

    const fetchData = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${type}?api_key=${API_KEY}&language=en-US&page=1`,
      );

      const data = await res.json();
      setMovies(data.results);
    };

    fetchData();
  }, [type]);

  return (
    <div style={{ marginBottom: "40px" }}>
      <h2>{title}</h2>

      <div className="movie_cards">
        {movies
          .filter((movie) =>
            movie.title.toLowerCase().includes((search || "").toLowerCase()),
          )
          .map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              name={movie.title}
              image={movie.poster_path}
              description={movie.overview}
              rate={movie.vote_average.toFixed(1)}
              date={movie.release_date}
              add={onAddToFavorites}
              remove={onRemoveFromFavorites}
              favList={favList}
            />
          ))}
      </div>
    </div>
  );
}
