import { useCallback, useState } from "react";
import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import debounce from "just-debounce-it";
import { useSearch } from "./hooks/useSearch";

function App() {
  const [sort, setSort] = useState(false);
  const { search, updateSearch, error } = useSearch();
  const { movies, getMovies, loading } = useMovies({ search, sort });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (error) return;
    getMovies({ search });
  };

  const debouncedMovies = useCallback(
    debounce((search) => {
      getMovies({ search });
    }, 400),
    [getMovies]
  );

  const handleOnChange = (e) => {
    const newSearch = e.target.value;
    if (newSearch.startsWith(" ")) return;

    updateSearch(newSearch);
    debouncedMovies(newSearch);
  };

  const handleSort = () => {
    setSort(!sort);
  };

  return (
    <>
      <section className="page">
        <header>
          <h1>Buscador de peliculas</h1>
          <form className="form" onSubmit={handleSubmit}>
            <input
              className="input-search"
              onChange={handleOnChange}
              name="search"
              value={search}
              placeholder="Avenger, Star Wars, The Matrix..."
            />

            <input type="checkbox" onChange={handleSort} checked={sort} />

            <button type="submit">Buscar</button>
          </form>
          {error && <small style={{ color: "red" }}>{error}</small>}
        </header>

        <main>{loading ? <p>Cargando...</p> : <Movies movies={movies} />}</main>
      </section>
    </>
  );
}

export default App;
