import { render, screen, fireEvent } from "@testing-library/react";
import { HashRouter, useLocation } from "react-router-dom";
import FileIcon from "../../../components/shared/FileIcon";

const PathLocation = () => {
  const location = useLocation();
  return <div>{location.pathname}</div>;
};

describe("<FileIcon />", () => {
  it("Move to edit file page", () => {
    render(
      <>
        <FileIcon />
        <PathLocation />
      </>,
      { wrapper: HashRouter },
    );

    const fileIcon = screen.getByTestId("file-icon");
    fireEvent.click(fileIcon);

    expect(screen.getByText("/edit")).toBeInTheDocument();
  });
});
