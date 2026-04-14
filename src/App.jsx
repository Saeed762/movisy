import "./App.css";
import Navbar from "./Components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieDetails from "./Components/Moviedetails";
import { useState, useEffect } from "react";
import Favorites from "./Components/Favorites";
import UpComing from "./Components/upcoming";
import TopRated from "./Components/TopRated";
import Popular from "./Components/popular";
import Movie_List from "./Components/Movie_List";
import Footer from "./Components/Footer";

const App = () => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function addTofavorites(movie) {
    setFavorites((prev) => {
      const exists = prev.find((m) => m.id === movie.id);
      if (exists) return prev;

      return [...prev, movie];
    });

    console.log("ADDED:", movie);
    console.log(import.meta.env);
  }

  function removeFromFavorites(id) {
    setFavorites((prev) => prev.filter((movie) => movie.id !== id));
  }

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar
          search={search}
          setSearch={setSearch}
          count={favorites.length}
          favList={favorites}
        />

        <main className="app-main">
          <Routes>
            <Route
              path="/"
              element={
                <Movie_List
                  onAddToFavorites={addTofavorites}
                  onRemoveFromFavorites={removeFromFavorites}
                  search={search}
                  favList={favorites}
                />
              }
            />

            <Route path="/movie/:id" element={<MovieDetails />} />

            <Route
              path="/movie/popular"
              element={
                <Popular
                  search={search}
                  onAddToFavorites={addTofavorites}
                  onRemoveFromFavorites={removeFromFavorites}
                  favList={favorites}
                />
              }
            />

            <Route
              path="/movie/upcoming"
              element={
                <UpComing
                  search={search}
                  onAddToFavorites={addTofavorites}
                  onRemoveFromFavorites={removeFromFavorites}
                  favList={favorites}
                />
              }
            />

            <Route
              path="/movie/top-rated"
              element={
                <TopRated
                  search={search}
                  onAddToFavorites={addTofavorites}
                  onRemoveFromFavorites={removeFromFavorites}
                  favList={favorites}
                />
              }
            />

            <Route
              path="/favorites"
              element={
                <Favorites favList={favorites} onRemove={removeFromFavorites} />
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
