import { AuthHeader } from "../../components/AuthHeader";
import Head from "next/head";
import { Box, Flex, Image, Text, Select, Button } from "@chakra-ui/react";
import { DateUtil } from "../../utils/date-util";
import { useGetMovieByIdFetcher } from "../../hooks/use-get-movie-by-id-fetcher";
import { useGetMovieVoteAverageFetcher } from "../../hooks/use-get-movie-vote-average-fetcher";
import { useState } from "react";
import { VoteService } from "../../services/vote-service";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ErrorLogger } from "../../services/error-logger";
import { GetServerSidePropsContext } from "next";
import { useGetVotesFetcher } from "../../hooks/use-get-votes-fetcher";

interface Props {
  movieId: string | string[] | undefined;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      movieId: context.params?.id,
    },
  };
}

const Filme = ({ movieId }: Props) => {
  const [vote, setVote] = useState<string>("0");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id: userId } = useSelector((state: RootState) => state.auth);

  const { movie } = useGetMovieByIdFetcher(movieId);
  const { votes } = useGetVotesFetcher({ movieId, userId });
  const { averageResponse } = useGetMovieVoteAverageFetcher(movieId);

  const shouldRenderVoteInput = userId && votes?.length === 0;

  if (!movie || !movieId) {
    return (
      <>
        <Head>
          <title>Imdb - O seu repositório de filmes</title>
        </Head>
        <AuthHeader />
        <Box maxWidth={1024} margin="0 auto" pt={2} alignContent="center">
          <Text fontSize="4xl">Nenhum filme encontrado</Text>
        </Box>
      </>
    );
  }

  const handleSelectOnChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setVote(event.target.value);
  };

  const handleVoteOnClick = () => {
    if (userId) {
      setIsLoading(true);
      VoteService.createVote({
        movieId: movie.id,
        userId,
        value: Number(vote),
      })
        .then()
        .catch((error) => ErrorLogger.log(error))
        .finally(() => setIsLoading(false));
    }
  };

  const reduceActors = (actors: string[]) => {
    return actors.reduce((prev, current) => {
      if (prev === "") {
        return current;
      }

      return `${prev}, ${current}`;
    }, "");
  };

  return (
    <>
      <Head>
        <title>Imdb - {movie.name}</title>
      </Head>
      <AuthHeader />
      <Box maxWidth={1024} margin="0 auto" pt={2}>
        <Flex gap={5}>
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "400px" }}
            src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            alt="Caffe Latte"
          />

          <Box>
            <Text as="b" fontSize="4xl">
              {movie.name}
            </Text>
            {averageResponse && (
              <Text fontSize="2xl">
                Pontuação média: {averageResponse.average}
              </Text>
            )}
            {votes && <Text fontSize="2xl">Seu voto: {votes[0].value}</Text>}
            <Text py="2">Diretor: {movie.directorName}</Text>
            <Text py="2">Gênero: {movie.genre}</Text>
            <Text py="2">
              Data de lançamento:{" "}
              {DateUtil.dateTimeLocaleFormat(movie.releaseDate)}
            </Text>
            <Text py="2">Atores: {reduceActors(movie.actors)}</Text>
            {shouldRenderVoteInput && (
              <Flex flexDirection="row" alignItems="center" gap={2}>
                <Select
                  onChange={handleSelectOnChange}
                  value={vote}
                  size="sm"
                  isDisabled={isLoading}
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </Select>
                <Button
                  colorScheme="yellow"
                  onClick={handleVoteOnClick}
                  size="sm"
                  isDisabled={isLoading}
                >
                  votar
                </Button>
              </Flex>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Filme;
