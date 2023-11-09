import { MovieCard } from "..";
import { render } from "@testing-library/react";

jest.mock("next/router", () => {
  const originalModule = jest.requireActual("next/router");
  return {
    __esModule: true,
    ...originalModule,
    useRouter: jest.fn(),
  };
});

describe("MovieCard test suite", () => {
  it("should render proper snapshot", () => {
    const { asFragment } = render(
      <MovieCard
        actors={["José", "João", "Maria"]}
        director="Nome do diretor"
        genre="Ação"
        id="id"
        name="Nome do filme"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
