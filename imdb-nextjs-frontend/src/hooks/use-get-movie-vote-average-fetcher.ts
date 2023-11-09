import useSWR from "swr";
import { ErrorLogger } from "../services/error-logger";
import { MovieService } from "../services/movie-service";

interface MovieAverageResponse {
  average: number;
}

export const useGetMovieVoteAverageFetcher = (
  movieId: string | string[] | undefined
) => {
  const { data: averageResponse, error } = useSWR<MovieAverageResponse>(
    `${MovieService.BASE_URL}/movies/${movieId}/votes-average`,
    MovieService.fetcher
  );

  ErrorLogger.log(error);

  return {
    averageResponse,
  };
};
