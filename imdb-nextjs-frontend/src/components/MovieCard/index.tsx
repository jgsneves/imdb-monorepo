import {
  Card,
  Stack,
  CardBody,
  Heading,
  CardFooter,
  Button,
  Text,
  Image,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

interface Props {
  id: string;
  name: string;
  director: string;
  genre: string;
  actors: string[];
}

export const MovieCard = ({ id, name, director, genre, actors }: Props) => {
  const reducedActors = actors.reduce((prev, current) => {
    if (prev === "") {
      return current;
    }

    return `${prev}, ${current}`;
  }, "");

  const router = useRouter();

  const handleDetailsButtonOnClick = () => {
    router.push(`/filmes/${id}`);
  };

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt="Caffe Latte"
      />

      <Stack>
        <CardBody>
          <Heading size="md">{name}</Heading>

          <Text py="2">Diretor: {director}</Text>
          <Text py="2">Gênero: {genre}</Text>
          <Text py="2">Atores: {reducedActors}</Text>
        </CardBody>

        <CardFooter>
          <Button
            variant="solid"
            colorScheme="yellow"
            onClick={handleDetailsButtonOnClick}
          >
            ver detalhes
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};
