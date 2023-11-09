import {
  Flex,
  Input,
  Text,
  Select,
  Button,
  Card,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import {
  CreateUserRequest,
  UserService,
} from "../../../../services/user-service";
import { UserRole } from "../../../../store/slices/auth-slice";
import { ErrorLogger } from "../../../../services/error-logger";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { isValidEmail } from "@brazilian-utils/brazilian-utils";
import { isValidPassword } from "../../../../utils/password-util";
import { findMessage } from "../../../../utils/request-error-handler";

export const CreateUser = () => {
  const toast = useToast();

  const initialFormData: CreateUserRequest = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    role: UserRole.ADMIN,
  };

  const validateNameInput = (value: string) => {
    let error;
    if (value.length === 0) {
      error = "Forneça um nome";
    }
    return error;
  };

  const validateEmailInput = (value: string) => {
    let error;
    if (!isValidEmail(value)) {
      error = "Forneça um e-mail válido";
    }
    return error;
  };

  const validatePasswordInput = (value: string) => {
    let error;
    if (!isValidPassword(value)) {
      error =
        "A senha deve conter números, letras, caracteres especiais e ser longa.";
    }
    return error;
  };

  const validateConfirmPassword = (value: string, passwordValue: string) => {
    let error;
    if (value !== passwordValue) {
      error = "Confirme a senha inserindo o mesmo valor";
    }
    return error;
  };

  const handleCreateOnClick = (
    values: CreateUserRequest,
    helpers: FormikHelpers<CreateUserRequest>
  ) => {
    UserService.createUser(values)
      .then(
        () => helpers.resetForm(),
        (reason) => {
          const message = findMessage(reason);

          toast({
            title: "Não foi possível criar um usuário.",
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
          Cadastrar um novo usuário
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
                    isDisabled={isSubmitting}
                    validate={validateNameInput}
                  />
                </FormLabel>
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.email && touched.email}>
                <FormLabel>
                  Email:
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    isDisabled={isSubmitting}
                    validate={validateEmailInput}
                  />
                </FormLabel>
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.password && touched.password}>
                <FormLabel>
                  Senha:
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    isDisabled={isSubmitting}
                    validate={validatePasswordInput}
                  />
                </FormLabel>
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={!!errors.confirmPassword && touched.confirmPassword}
              >
                <FormLabel>
                  Confirme a senha:
                  <Field
                    as={Input}
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    isDisabled={isSubmitting}
                    validate={(value: string) =>
                      validateConfirmPassword(value, values.password)
                    }
                  />
                </FormLabel>
                <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
              </FormControl>

              <FormLabel>
                Privilégio:
                <Select id="role" name="role" isDisabled={isSubmitting}>
                  <option value={UserRole.ADMIN}>Admin</option>
                  <option value={UserRole.USER}>User</option>
                </Select>
              </FormLabel>

              <Button
                colorScheme="yellow"
                width="100%"
                type="submit"
                isDisabled={isSubmitting}
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
