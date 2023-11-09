import useSWR from "swr";
import { Movie, MovieService } from "../services/movie-service";
import { ErrorLogger } from "../services/error-logger";

interface FetchQueryParams {
  directorName?: string;
  genre?: string;
  name?: string;
  actors?: string;
}

export const useGetMoviesFetcher = (params?: FetchQueryParams) => {
  const urlParams = new URLSearchParams();

  if (params?.actors) urlParams.append("actors", params.actors);

  if (params?.directorName)
    urlParams.append("directorName", params.directorName);

  if (params?.genre) urlParams.append("genre", params.genre);

  if (params?.name) urlParams.append("name", params.name);

  const { data: movies, error } = useSWR<Movie[]>(
    `${MovieService.BASE_URL}/movies?${urlParams.toString()}`,
    MovieService.fetcher
  );

  ErrorLogger.log(error);

  return {
    movies,
  };
};
