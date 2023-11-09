import { render } from "@testing-library/react";
import { AuthHeader } from "..";
import { Provider } from "react-redux";
import { store } from "../../../store";
import { UserRole, login } from "../../../store/slices/auth-slice";

jest.mock("next/router", () => {
  const originalModule = jest.requireActual("next/router");
  return {
    __esModule: true,
    ...originalModule,
    useRouter: jest.fn(),
  };
});

describe("AuthHeader test suite", () => {
  const renderWithReduxProvider = () =>
    render(
      <Provider store={store}>
        <AuthHeader />
      </Provider>
    );
  it("should render public state snapshot", () => {
    const { asFragment } = renderWithReduxProvider();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render private state snapshot", () => {
    store.dispatch(
      login({
        accessToken: "acct",
        email: "email",
        expiringDate: "date",
        id: "id",
        role: UserRole.ADMIN,
      })
    );
    const { asFragment } = renderWithReduxProvider();
    expect(asFragment()).toMatchSnapshot();
  });
});
