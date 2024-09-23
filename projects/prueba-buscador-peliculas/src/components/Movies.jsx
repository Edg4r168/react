export const ListOfMovies = ({ movies }) => {
  return (
    <ul className="movies">
      {movies.map((movies) => (
        <li className="movie" key={movies.id}>
          <div>
            <h3>{movies.title}</h3>
            <p>{movies.year}</p>
          </div>
          <img src={movies.poster} alt={movies.title} />
        </li>
      ))}
    </ul>
  );
};

const NoMoviesResults = () => {
  return <p>No se encontraron resultados para esta pelicula</p>;
};

export const Movies = ({ movies }) => {
  const hasMovies = movies?.length > 0;

  return hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResults />;
};
