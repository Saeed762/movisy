import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import "../Style/Favorites.css";

export default function Favorites({ favList = [], onRemove }) {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="favorites">
      <h2>❤️ Favorites</h2>

      {favList.length === 0 ? (
        <p className="empty">No favorite movies yet. Start adding some!</p>
      ) : (
        favList.map((movie) => (
          <div key={movie.id} className="item">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.image}`}
              className="fav-img"
            />

            <div className="info">
              <h3>{movie.name}</h3>
              {movie.rate && <p className="meta">⭐ {movie.rate}</p>}
              {movie.date && <p className="date">{movie.date}</p>}
            </div>

            <button
              className="remove-btn"
              onClick={() => setSelectedId(movie.id)}
              aria-label={`Remove ${movie.name} from favorites`}
            >
              ✖
            </button>
          </div>
        ))
      )}
      <ConfirmModal
        isOpen={!!selectedId}
        onClose={() => setSelectedId(null)}
        onConfirm={() => {
          onRemove(selectedId);
          setSelectedId(null);
        }}
        text="Delete this movie?"
      />
    </div>
  );
}
