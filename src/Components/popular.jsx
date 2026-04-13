import MoviesSection from "./MoviesSection";
import "../Style/movie-list.css";
function MoviesPage({ search, onAddToFavorites }) {
  return (
    <div style={{ padding: "20px" }}>
      <MoviesSection
        title="🔥 Popular"
        type="popular"
        search={search}
        onAddToFavorites={onAddToFavorites}
      />
    </div>
  );
}

export default MoviesPage;
