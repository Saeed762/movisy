import "./app.css";
import Navbar from "./Components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieDetails from "./Components/Moviedetails";
import { useState, useEffect } from "react";
import Favorites from "./Components/Favorites";
import UpComing from "./Components/upcoming";
import TopRated from "./Components/TopRated";
import Popular from "./Components/popular";
import Movie_List from "./Components/Movie_List";

const App = () => {
  // 🔥 1. تحميل من localStorage
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [search, setSearch] = useState("");

  // 🔥 2. حفظ تلقائي
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // 🔥 3. إضافة بدون تكرار
  function addTofavorites(movie) {
    setFavorites((prev) => {
      const exists = prev.find((m) => m.id === movie.id);
      if (exists) return prev;

      return [...prev, movie];
    });

    console.log("ADDED:", movie);
    console.log(import.meta.env);
  }

  // 🔥 4. حذف
  function removeFromFavorites(id) {
    setFavorites((prev) => prev.filter((movie) => movie.id !== id));
  }

  return (
    <BrowserRouter>
      <Navbar
        search={search}
        setSearch={setSearch}
        count={favorites.length}
        favList={favorites}
      />

      <Routes>
        <Route
          path="/movie/"
          element={
            <Movie_List
              onAddToFavorites={addTofavorites}
              search={search}
              favList={favorites}
            />
          }
        />

        <Route path="/movie/:id" element={<MovieDetails />} />

        <Route
          path="/movie/popular"
          element={
            <Popular search={search} onAddToFavorites={addTofavorites} />
          }
        />

        <Route
          path="/movie/upcoming"
          element={
            <UpComing search={search} onAddToFavorites={addTofavorites} />
          }
        />

        <Route
          path="/movie/top-rated"
          element={
            <TopRated search={search} onAddToFavorites={addTofavorites} />
          }
        />

        <Route
          path="/favorites"
          element={
            <Favorites favList={favorites} onRemove={removeFromFavorites} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
