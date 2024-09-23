/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

// 1. Crear el contexto
export const FiltersContext = createContext(); // El que se consume

// 2. Crear el Provider, para proveer el contexto
// El que nos provee el acceso a los datos
export function FiltersProvider({ children }) {
  const [filters, setFilters] = useState({
    category: "all",
    minPrice: 0,
  });

  return (
    <FiltersContext.Provider
      value={{
        filters,
        setFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}
