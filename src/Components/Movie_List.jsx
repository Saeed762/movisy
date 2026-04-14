import MoviesSection from "./MoviesSection";
import "../Style/movie-list.css";
function Moive_List({ search, onAddToFavorites, onRemoveFromFavorites, favList }) {
  return (
    <>
      <div style={{ padding: "20px" }}>
        <MoviesSection
          title="🔥 Popular"
          type="popular"
          search={search}
          onAddToFavorites={onAddToFavorites}
          onRemoveFromFavorites={onRemoveFromFavorites}
          favList={favList}
        />
      </div>
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
    </>
  );
}

export default Moive_List;
