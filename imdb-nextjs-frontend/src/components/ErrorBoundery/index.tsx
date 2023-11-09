import React, { ErrorInfo } from "react";
import { ErrorLogger } from "../../services/error-logger";
import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";

interface Props {
  children?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: any) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    ErrorLogger.log(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box>
          <Text>Houve algum erro. Volte para a página principal.</Text>
          <Link href="/">voltar</Link>
        </Box>
      );
    }

    return this.props.children;
  }
}
