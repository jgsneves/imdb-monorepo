import useSWR from "swr";
import { ErrorLogger } from "../services/error-logger";
import { Vote, VoteService } from "../services/vote-service";

interface FetchQueryParams {
  movieId?: string | string[] | undefined;
  userId?: string | null;
}

export const useGetVotesFetcher = (params?: FetchQueryParams) => {
  const urlParams = new URLSearchParams();

  if (typeof params?.movieId === "string")
    urlParams.append("movieId", params.movieId);

  if (typeof params?.userId === "string")
    urlParams.append("userId", params.userId);

  const { data: votes, error } = useSWR<Vote[]>(
    `${VoteService.BASE_URL}/votes?${urlParams.toString()}`,
    VoteService.fetcher
  );

  ErrorLogger.log(error);

  return {
    votes,
  };
};
