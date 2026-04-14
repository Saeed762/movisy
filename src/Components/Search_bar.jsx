import "../Style/search_bar.css";

export default function SearchBar({ setSearch }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="search..."
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
