import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  Input,
  Text,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { FilterInputValues } from "../../pages";

interface Props {
  filterInputValues: FilterInputValues;
  setFilterInputValues: Dispatch<SetStateAction<FilterInputValues>>;
}

export const MoviesFilters = ({
  filterInputValues,
  setFilterInputValues,
}: Props) => {
  const handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFilterInputValues((state) => ({ ...state, [id]: value }));
  };

  const handleClearOnClick = () =>
    setFilterInputValues({
      actors: "",
      directorName: "",
      genre: "",
      name: "",
    });

  return (
    <Accordion allowToggle>
      <AccordionItem>
        <AccordionButton borderStyle="none" px={0}>
          <Text
            flex={1}
            textAlign="left"
            as="h1"
            fontWeight={700}
            fontSize="xl"
          >
            Filtros (+)
          </Text>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <Flex flexDirection="column" gap={2} width={["100%", "50%"]}>
            <Text as="i" display="block">
              Filtre filmes por:
            </Text>
            <label>
              Nome
              <Input
                id="name"
                onChange={handleInputOnChange}
                value={filterInputValues.name}
              />
            </label>
            <label>
              Nome do Diretor
              <Input
                id="directorName"
                onChange={handleInputOnChange}
                value={filterInputValues.directorName}
              />
            </label>
            <label>
              Gênero
              <Input
                id="genre"
                onChange={handleInputOnChange}
                value={filterInputValues.genre}
              />
            </label>
            <label>
              Nome de Atores (separar por vírgula)
              <Input
                id="actors"
                onChange={handleInputOnChange}
                value={filterInputValues.actors}
              />
            </label>
            <Button colorScheme="yellow" onClick={handleClearOnClick}>
              limpar filtros
            </Button>
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
