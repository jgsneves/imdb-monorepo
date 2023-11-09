import { BasePrivateService } from "./base-private-service";

export interface GetMoviesQueryParams {
  directorName?: string;
  genre?: string;
  name?: string;
  actors?: string;
}

export interface Movie {
  actors: string[];
  createdAt: string;
  directorName: string;
  genre: string;
  id: string;
  name: string;
  releaseDate: string;
  updatedAt: string;
}

export interface CreateMovieRequestBody {
  name: string;
  releaseDate: string;
  genre: string;
  directorName: string;
  actors: string[];
}

export class MovieService extends BasePrivateService {
  public static createMovie(data: CreateMovieRequestBody) {
    return this.buildAxiosInstance().post<Movie>("/movies", data);
  }
}
