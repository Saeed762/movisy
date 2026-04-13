import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import "../Style/favorites.css";

export default function Favorites({ favList = [], onRemove }) {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="favorites">
      <h2>❤️ Favorites</h2>

      {favList.map((movie) => (
        <div key={movie.id} className="item">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.image}`}
            className="fav-img"
          />

          <div className="info">
            <h3>{movie.name}</h3>
          </div>

          <button
            className="remove-btn"
            onClick={() => setSelectedId(movie.id)}
          >
            ✖
          </button>
        </div>
      ))}

      {/* 🔥 استعمال API */}
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
