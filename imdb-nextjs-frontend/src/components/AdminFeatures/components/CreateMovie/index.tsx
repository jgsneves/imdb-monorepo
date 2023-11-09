import {
  Flex,
  Button,
  Card,
  Input,
  Text,
  FormLabel,
  FormControl,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import {
  CreateMovieRequestBody,
  MovieService,
} from "../../../../services/movie-service";
import { ErrorLogger } from "../../../../services/error-logger";
import { mutate } from "swr";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { findMessage } from "../../../../utils/request-error-handler";

interface FormData extends Omit<CreateMovieRequestBody, "actors"> {
  actors: string;
}

export const CreateMovie = () => {
  const toast = useToast();

  const initialFormData: FormData = {
    actors: "",
    directorName: "",
    genre: "",
    name: "",
    releaseDate: "",
  };

  const validateNameInput = (value: string) => {
    let error;
    if (value.length === 0) {
      error = "Forneça um nome";
    }
    return error;
  };

  const validateReleaseDateInput = (value: string) => {
    let error;
    if (value.length === 0) {
      error = "Forneça a data de lançamento";
    }
    return error;
  };

  const validateGenreInput = (value: string) => {
    let error;
    if (value.length === 0) {
      error = "Forneça um gênero do filme";
    }
    return error;
  };

  const validateDirectorNameInput = (value: string) => {
    let error;
    if (value.length === 0) {
      error = "Forneça um nome de diretor";
    }
    return error;
  };

  const validateActorsInput = (value: string) => {
    let error;
    if (value.length === 0) {
      error = "Forneça os atores do filme";
    }
    return error;
  };

  const handleCreateOnClick = (
    values: FormData,
    helpers: FormikHelpers<FormData>
  ) => {
    const actorsArray = values.actors.split(",");
    const dateIsoString = new Date(values.releaseDate).toISOString();

    MovieService.createMovie({
      ...values,
      actors: actorsArray,
      releaseDate: dateIsoString,
    })
      .then(
        () => {
          helpers.resetForm();
          mutate(`${MovieService.BASE_URL}/movies?`);
        },
        (reason) => {
          const message = findMessage(reason);

          toast({
            title: "Não foi possível criar um novo filme.",
            description: `${message ?? "Erro inesperado."}`,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      )
      .catch((error) => ErrorLogger.log(error))
      .finally(() => helpers.setSubmitting(false));
  };

  return (
    <Card width={["100%", "50%"]}>
      <Flex gap={2} padding={2} flexDirection="column">
        <Text as="b" display="block">
          Cadastrar um novo filme
        </Text>
        <Formik
          initialValues={initialFormData}
          onSubmit={(values, helpers) => handleCreateOnClick(values, helpers)}
        >
          {({ errors, touched, isSubmitting, values }) => (
            <Form>
              <FormControl isInvalid={!!errors.name && touched.name}>
                <FormLabel>
                  Nome:
                  <Field
                    as={Input}
                    id="name"
                    name="name"
                    data-testid="name"
                    disabled={isSubmitting}
                    validate={validateNameInput}
                  />
                </FormLabel>
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={!!errors.releaseDate && touched.releaseDate}
              >
                <FormLabel>
                  Data de lançamento:
                  <Field
                    as={Input}
                    id="releaseDate"
                    name="releaseDate"
                    data-testid="releaseDate"
                    type="date"
                    disabled={isSubmitting}
                    validate={validateReleaseDateInput}
                  />
                </FormLabel>
                <FormErrorMessage>{errors.releaseDate}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.genre && touched.genre}>
                <FormLabel>
                  Gênero:
                  <Field
                    as={Input}
                    id="genre"
                    name="genre"
                    data-testid="genre"
                    disabled={isSubmitting}
                    validate={validateGenreInput}
                  />
                </FormLabel>
                <FormErrorMessage>{errors.genre}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={!!errors.directorName && touched.directorName}
              >
                <FormLabel>
                  Nome do Diretor:
                  <Field
                    as={Input}
                    id="directorName"
                    name="directorName"
                    data-testid="directorName"
                    disabled={isSubmitting}
                    validate={validateDirectorNameInput}
                  />
                </FormLabel>
                <FormErrorMessage>{errors.directorName}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.actors && touched.actors}>
                <FormLabel>
                  Atores (separar por vírgulas):
                  <Field
                    as={Input}
                    id="actors"
                    name="actors"
                    data-testid="actors"
                    disabled={isSubmitting}
                    validate={validateActorsInput}
                  />
                </FormLabel>
                <FormErrorMessage>{errors.actors}</FormErrorMessage>
              </FormControl>

              <Button
                colorScheme="yellow"
                type="submit"
                width="100%"
                disabled={isSubmitting}
              >
                salvar
              </Button>
            </Form>
          )}
        </Formik>
      </Flex>
    </Card>
  );
};
