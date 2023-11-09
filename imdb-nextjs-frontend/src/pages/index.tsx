import Head from "next/head";
import { AuthHeader } from "../components/AuthHeader";
import { MoviesFilters } from "../components/MoviesFilters";
import { Flex } from "@chakra-ui/react";
import { MovieCard } from "../components/MovieCard";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { CreateMovie } from "../components/AdminFeatures/components/CreateMovie";
import { UserRole } from "../store/slices/auth-slice";
import { useGetMoviesFetcher } from "../hooks/use-get-movies-fetcher";
import { CreateUser } from "../components/AdminFeatures/components/CreateUser";
import { useEffect, useState } from "react";
import useDebouncer from "../hooks/use-debouncer";
import { AuthCookieService } from "../services/auth-cookie-service";
import { AdminFeatures } from "../components/AdminFeatures";

export interface FilterInputValues {
  name: string;
  directorName: string;
  genre: string;
  actors: string;
}

export default function Home() {
  const [filterInputValues, setFilterInputValues] = useState<FilterInputValues>(
    {
      name: "",
      directorName: "",
      genre: "",
      actors: "",
    }
  );
  const debouncerDelay = 1000;

  const { role } = useSelector((state: RootState) => state.auth);

  const debouncedActorsFilter = useDebouncer<string>(
    filterInputValues.actors,
    debouncerDelay
  );
  const debouncedDirectorNameFilter = useDebouncer<string>(
    filterInputValues.directorName,
    debouncerDelay
  );
  const debouncedGenreFilter = useDebouncer<string>(
    filterInputValues.genre,
    debouncerDelay
  );
  const debouncedNameFilter = useDebouncer<string>(
    filterInputValues.name,
    debouncerDelay
  );

  const { movies } = useGetMoviesFetcher({
    actors: debouncedActorsFilter,
    directorName: debouncedDirectorNameFilter,
    genre: debouncedGenreFilter,
    name: debouncedNameFilter,
  });

  useEffect(() => {
    AuthCookieService.verifyAuthCookie();
  }, []);

  return (
    <>
      <Head>
        <title>Imdb - O seu repositório de filmes</title>
        <meta name="description" content="Imdb - O seu repositório de filmes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthHeader />
      <Flex
        maxWidth={["90vw", 1024]}
        margin="0 auto"
        gap={2}
        flexDirection="column"
        pt={2}
      >
        {role === UserRole.ADMIN && <AdminFeatures />}

        <MoviesFilters
          filterInputValues={filterInputValues}
          setFilterInputValues={setFilterInputValues}
        />

        <Flex flexDirection="column" gap={2}>
          {movies?.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              actors={movie.actors}
              director={movie.directorName}
              genre={movie.genre}
              name={movie.name}
            />
          ))}
        </Flex>
      </Flex>
    </>
  );
}
