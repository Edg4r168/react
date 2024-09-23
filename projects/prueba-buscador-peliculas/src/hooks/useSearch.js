import { useEffect, useRef, useState } from "react";

export const useSearch = () => {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }

    if (search.match(/^\d+$/)) {
      setError("No se puede buscar una pelicula solo con numeros");
      return;
    }

    if (search.length < 3) {
      setError("La busqueda debe tener mas de tres carecteres");
      return;
    }

    setError(null);
  }, [search]);

  return { search, updateSearch, error };
};
