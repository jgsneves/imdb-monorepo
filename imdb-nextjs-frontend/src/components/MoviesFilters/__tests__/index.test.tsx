import { fireEvent, render } from "@testing-library/react";
import { MoviesFilters } from "..";

describe("MoviesFilters test suite", () => {
  it("setFilterInputValues should been called by input change event", () => {
    const mockedSetInputValue = jest.fn();
    const { getByRole } = render(
      <MoviesFilters
        filterInputValues={{
          actors: "",
          directorName: "",
          genre: "",
          name: "",
        }}
        setFilterInputValues={mockedSetInputValue}
      />
    );
    fireEvent.click(
      getByRole("button", {
        name: /filtros \(\+\)/i,
      })
    );
    fireEvent.change(
      getByRole("textbox", {
        name: /gênero/i,
      }),
      { target: { value: "Ação" } }
    );

    expect(mockedSetInputValue).toHaveBeenCalled();
  });
});
