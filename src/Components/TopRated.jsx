import MoviesSection from "./MoviesSection";
import "../Style/movie-list.css";
function MoviesPage({ search, onAddToFavorites, onRemoveFromFavorites, favList }) {
  return (
    <div style={{ padding: "20px" }}>
      <MoviesSection
        title="⭐ Top Rated"
        type="top_rated"
        search={search}
        onAddToFavorites={onAddToFavorites}
        onRemoveFromFavorites={onRemoveFromFavorites}
        favList={favList}
      />
    </div>
  );
}

export default MoviesPage;
