import { ChangeEvent, useMemo, useRef, useState } from "react";
import "./App.css";
import { SortBy, type User } from "./types.d";
import { UsersLists } from "./components/UsersList";
import { useUsers } from "./hooks/useUsers";
import { Results } from "./components/Results";

const compareProperties: Record<string, (user: User) => string> = {
  [SortBy.Country]: (user) => user.location.country,
  [SortBy.Name]: (user) => user.name.first,
  [SortBy.Last]: (user) => user.name.last,
};

function App() {
  const { isError, isLoading, users, hasNextPage, fetchNextPage, refetch } =
    useUsers();

  const [showColors, setShowColors] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.None);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);

  const toggleColors = () => {
    setShowColors((prev) => !prev);
  };

  const toggleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.None ? SortBy.Country : SortBy.None;

    setSorting(newSortingValue);
  };

  const handleReset = async () => {
    // setUsers(originalUsers.current);
    await refetch();
  };

  const handleDelete = (id: string) => {
    // const newUsers = users.filter((user) => user.login.uuid !== id);
    // setUsers(newUsers);
  };

  const hanleSortChange = (sort: SortBy) => {
    setSorting(sort);
  };

  const filteredCountry = useMemo(() => {
    return filterCountry != null && filterCountry.length > 0
      ? users.filter((user) =>
          user.location.country
            .toLowerCase()
            .startsWith(filterCountry.toLowerCase())
        )
      : users;
  }, [users, filterCountry]);

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.None) return filteredCountry;

    const stractProperty = compareProperties[sorting];

    return filteredCountry.toSorted((a, b) => {
      return stractProperty(a).localeCompare(stractProperty(b));
    });
  }, [filteredCountry, sorting]);

  return (
    <>
      <h1>Lista de usuarios</h1>
      <header>
        <button onClick={toggleColors}>Colorear filas</button>
        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.Country
            ? "No ordenar por país"
            : "Ordenar por país"}
        </button>
        <button onClick={handleReset}>Restaurar usuarios</button>
        <input
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFilterCountry(e.target.value)
          }
        />
      </header>

      <main>
        <Results />

        {users.length > 0 && (
          <UsersLists
            deleteuser={handleDelete}
            showColors={showColors}
            changeSorting={hanleSortChange}
            users={sortedUsers}
          />
        )}

        {isLoading && <strong>Cargando...</strong>}

        {isError && <p>Ha ocurrido un error</p>}

        {!isLoading && !isError && users.length === 0 && <p>No hay usuarios</p>}

        {!isLoading && !isError && hasNextPage && (
          <button onClick={() => fetchNextPage()}>Cargar mas resultados</button>
        )}

        {!isLoading && !isError && !hasNextPage && <p>No hay mas resultados</p>}
      </main>
    </>
  );
}

export default App;
