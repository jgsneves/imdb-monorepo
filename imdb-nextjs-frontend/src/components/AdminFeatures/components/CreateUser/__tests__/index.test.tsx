import { render } from "@testing-library/react";
import { CreateUser } from "..";

describe("CreateUser test suite", () => {
  it("should render proper snapshot", () => {
    const { asFragment } = render(<CreateUser />);
    expect(asFragment()).toMatchSnapshot();
  });
});
