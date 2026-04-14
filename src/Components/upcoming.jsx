import MoviesSection from "./MoviesSection";
import "../Style/movie-list.css";
function MoviesPage({ search, onAddToFavorites, onRemoveFromFavorites, favList }) {
  return (
    <div style={{ padding: "20px" }}>
      <MoviesSection
        title="🚀 Upcoming"
        type="upcoming"
        search={search}
        onAddToFavorites={onAddToFavorites}
        onRemoveFromFavorites={onRemoveFromFavorites}
        favList={favList}
      />
    </div>
  );
}

export default MoviesPage;
