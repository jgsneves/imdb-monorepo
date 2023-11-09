import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Text,
} from "@chakra-ui/react";
import { CreateMovie } from "./components/CreateMovie";
import { CreateUser } from "./components/CreateUser";

export const AdminFeatures = () => {
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
            Funcionalidades de Admin
          </Text>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <Flex
            gap={2}
            flexDirection={{
              base: "column",
              md: "row",
            }}
          >
            <CreateMovie />
            <CreateUser />
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
