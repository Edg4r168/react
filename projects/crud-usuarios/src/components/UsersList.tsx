import { type FC } from "react";
import { SortBy, type User } from "../types.d";

interface Props {
  users: User[];
  showColors: boolean;
  deleteuser: (id: string) => void;
  changeSorting: (sort: SortBy) => void;
}
export const UsersLists: FC<Props> = ({
  deleteuser,
  changeSorting,
  users,
  showColors,
}) => {
  return (
    <table className={showColors ? "showColors" : ""}>
      <thead>
        <tr>
          <th>Foto</th>
          <th onClick={() => changeSorting(SortBy.Name)}>Nombre</th>
          <th onClick={() => changeSorting(SortBy.Last)}>Apellido</th>
          <th onClick={() => changeSorting(SortBy.Country)}>País</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, _index) => (
          <tr key={user.login.uuid}>
            <td>
              <img src={user.picture.thumbnail} alt="Foto del usuario" />
            </td>
            <td>{user.name.first}</td>
            <td>{user.name.last}</td>
            <td>{user.location.country}</td>
            <td>
              <button onClick={() => deleteuser(user.login.uuid)}>
                Borrar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
