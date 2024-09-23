const API = "https://www.omdbapi.com/?i=tt3896198&apikey=31f337c2";

export const getMoviesService = async ({ search }) => {
  if (search === "") return [];

  try {
    const response = await fetch(`${API}&s=${search}`);
    const json = await response.json();

    return json.Search?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    }));
  } catch (error) {
    throw new Error("Error al buscar peliculas");
  }
};
