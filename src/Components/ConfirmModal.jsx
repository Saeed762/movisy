import "../Style/modal.css";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  text = "Are you sure?",
}) {
  if (!isOpen) return null; // 🔥 API open/close

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()} // 🔥 يمنع الإغلاق عند الضغط داخل
      >
        <p>{text}</p>

        <div className="modal-buttons">
          <h4 style={{ color: "black" }}>
            are you sure you wont to delete this movie from favorites?
          </h4>

          <button className="yes" onClick={onConfirm}>
            Yes
          </button>

          <button className="no" onClick={onClose}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
