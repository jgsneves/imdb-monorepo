import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { BrandLogo } from "../BrandLogo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { UserRole, logOut, login } from "../../store/slices/auth-slice";
import { DateUtil } from "../../utils/date-util";
import { ErrorLogger } from "../../services/error-logger";
import { jwtDecode } from "jwt-decode";
import { AuthService, LoginRequestBody } from "../../services/auth-service";
import { useRouter } from "next/router";
import { AuthCookieService } from "../../services/auth-cookie-service";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { isValidEmail } from "@brazilian-utils/brazilian-utils";
import { findMessage } from "../../utils/request-error-handler";

export interface JwtPayload {
  email: string;
  role: UserRole;
  sub: string;
}

export const AuthHeader = () => {
  const initialValues: LoginRequestBody = {
    email: "",
    password: "",
  };

  const { userEmail } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const toast = useToast();
  const router = useRouter();

  const handleBrandOnClick = () => {
    router.push("/");
  };

  const handleLogoutButtonOnClick = () => {
    dispatch(logOut());
    AuthCookieService.deleteAccessTokenCookie();
  };

  const validateEmailInput = (value: string) => {
    let error;
    if (!isValidEmail(value)) {
      error = "Forneça um endereço de e-mail válido";
    }
    return error;
  };

  const validatePasswordInput = (value: string) => {
    let error;

    if (value.length === 0) {
      error = "Forneça a sua senha";
    }

    return error;
  };

  const handleLoginButtonOnClick = (
    values: LoginRequestBody,
    helpers: FormikHelpers<LoginRequestBody>
  ) => {
    AuthService.login({
      email: values.email,
      password: values.password,
    })
      .then(
        (result) => {
          const { access_token, expires_in } = result.data;
          const { email, role, sub } = jwtDecode<JwtPayload>(access_token);

          AuthCookieService.createAccessTokenCookie(access_token, expires_in);

          dispatch(
            login({
              accessToken: access_token,
              email,
              expiringDate:
                DateUtil.addDaysToCurrentDate(expires_in).toISOString(),
              role,
              id: sub,
            })
          );
        },
        (reason) => {
          const message = findMessage(reason);

          toast({
            title: "Não foi possível fazer login.",
            description: `${message ?? "Erro inesperado."}`,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      )
      .catch((error) => {
        ErrorLogger.log(error);
      })
      .finally(() => helpers.setSubmitting(false));
  };

  return (
    <Box as="header" bgColor="black">
      <Flex
        flexDirection={{
          base: "column",
          lg: "row",
        }}
        bgColor="black"
        py={2}
        gap={3}
        maxWidth={["90vw", 1024]}
        margin="0 auto"
      >
        <Box flexDirection="row" gap={2} alignItems="center" flex={1}>
          <Button
            variant="ghost"
            onClick={handleBrandOnClick}
            p={0}
            _hover={{ bg: "none" }}
          >
            <BrandLogo />
          </Button>
        </Box>
        {userEmail ? (
          <Flex alignItems="center" gap={2}>
            <Text as="b" color="white">
              Olá, {userEmail}!{" "}
            </Text>
            <Button
              maxWidth={250}
              colorScheme="yellow"
              onClick={handleLogoutButtonOnClick}
              size="sm"
            >
              sair
            </Button>
          </Flex>
        ) : (
          <Flex
            flexDirection={{
              base: "column",
              md: "row",
            }}
            gap={3}
            alignItems="center"
          >
            <Formik
              initialValues={initialValues}
              onSubmit={(values, helpers) => {
                handleLoginButtonOnClick(values, helpers);
              }}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <Flex alignItems="center" gap={2}>
                    <FormControl isInvalid={!!errors.email && touched.email}>
                      <Field
                        as={Input}
                        type="email"
                        bgColor="white"
                        width={250}
                        placeholder="e-mail"
                        id="email"
                        name="email"
                        isDisabled={isSubmitting}
                        size="sm"
                        validate={validateEmailInput}
                      />
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={!!errors.password && touched.password}
                    >
                      <Field
                        as={Input}
                        bgColor="white"
                        width={250}
                        type="password"
                        placeholder="senha"
                        id="password"
                        name="password"
                        isDisabled={isSubmitting}
                        size="sm"
                        validate={validatePasswordInput}
                      />
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>
                    <Button
                      maxWidth={250}
                      colorScheme="yellow"
                      isLoading={isSubmitting}
                      size="sm"
                      type="submit"
                    >
                      entrar
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};
