import { render } from "@testing-library/react";
import { CreateMovie } from "..";

describe("CreateMovie test suite", () => {
  it("Should render proper snapshot", () => {
    const { asFragment } = render(<CreateMovie />);
    expect(asFragment()).toMatchSnapshot();
  });
});
