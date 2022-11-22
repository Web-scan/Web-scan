import { render, screen, fireEvent } from "@testing-library/react";
import { HashRouter, useLocation } from "react-router-dom";
import Logo from "../../../components/shared/Logo";

const PathLocation = () => {
  const location = useLocation();
  return <div>{location.pathname}</div>;
};

describe("<Logo />", () => {
  it("Move to root page", () => {
    render(
      <>
        <Logo />
        <PathLocation />
      </>,
      { wrapper: HashRouter },
    );

    const logo = screen.getByAltText("logo");
    fireEvent.click(logo);

    expect(screen.getByText("/")).toBeInTheDocument();
  });
});
