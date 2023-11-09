import useSWR from "swr";
import { Movie, MovieService } from "../services/movie-service";
import { ErrorLogger } from "../services/error-logger";

export const useGetMovieByIdFetcher = (
  movieGuid: string | string[] | undefined
) => {
  const { data: movie, error } = useSWR<Movie>(
    `${MovieService.BASE_URL}/movies/${movieGuid}`,
    MovieService.fetcher
  );

  ErrorLogger.log(error);

  return {
    movie,
  };
};
