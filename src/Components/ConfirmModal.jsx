import { useEffect } from "react";
import "../Style/modal.css";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Remove from favorites?",
  text = "This action will remove the movie from your favorites list.",
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        aria-describedby="confirm-modal-text"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="confirm-modal-title" className="modal-title">
          {title}
        </h3>
        <p id="confirm-modal-text" className="modal-text">
          {text}
        </p>

        <div className="modal-buttons">
          <button className="modal-btn modal-btn-cancel" onClick={onClose}>
            Cancel
          </button>

          <button className="modal-btn modal-btn-danger" onClick={onConfirm}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
