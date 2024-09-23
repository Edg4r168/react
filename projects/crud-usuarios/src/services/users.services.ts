import { User } from "../types";

export const getUsers = async ({ pageParam = 1 }: { pageParam?: number }) => {
  const res = await fetch(
    `https://randomuser.me/api/?results=10&seed=midudev&page=${pageParam}`
  );

  if (!res.ok) throw new Error("Error en la petición");

  const response = await res.json();
  const currentPage = Number(response.info.page);
  const nextCursor = currentPage > 3 ? undefined : currentPage + 1;
  return {
    users: response.results as User[],
    nextCursor,
  };
};
