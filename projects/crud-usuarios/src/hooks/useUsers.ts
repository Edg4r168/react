import { useInfiniteQuery } from "@tanstack/react-query";
import { getUsers } from "../services/users.services";

export const useUsers = () => {
  const { isError, isLoading, data, hasNextPage, fetchNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["users"], // key de la información o qury
      queryFn: getUsers, // como traer la información
      initialPageParam: 1,
      getNextPageParam: (lastPage, _pages) => lastPage.nextCursor,
      refetchOnWindowFocus: false,
    });

  return {
    isError,
    isLoading,
    users: data?.pages?.flatMap((page) => page.users) ?? [],
    hasNextPage,
    fetchNextPage,
    refetch,
  };
};
