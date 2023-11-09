import { render } from "@testing-library/react";
import { ErrorBoundary } from "..";

const GoodComponent = () => {
  return <h1>I am a good component!</h1>;
};

const BadComponent = () => {
  throw new Error("ble!");
};

describe("ErrorBoundery test suite", () => {
  it("should render children component", () => {
    const { getByText } = render(
      <ErrorBoundary>
        <GoodComponent />
      </ErrorBoundary>
    );
    expect(getByText("I am a good component!")).toBeTruthy();
  });

  it("should render error state", () => {
    const { getByText } = render(
      <ErrorBoundary>
        <BadComponent />
      </ErrorBoundary>
    );
    expect(
      getByText("Houve algum erro. Volte para a página principal.")
    ).toBeTruthy();
  });
});
