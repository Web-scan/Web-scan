import fs from "fs";

import { render, screen, fireEvent } from "@testing-library/react";
import { HashRouter, useLocation } from "react-router-dom";
import { RecoilRoot } from "recoil";

import LoadedFileCodeArea from "../../../components/editFile/LoadedFileCodeArea";

jest.mock("fs");

const PathLocation = () => {
  const location = useLocation();
  return <div>{location.pathname}</div>;
};

beforeEach(() => {
  render(
    <RecoilRoot>
      <LoadedFileCodeArea />
      <PathLocation />
    </RecoilRoot>,
    { wrapper: HashRouter },
  );
});

describe("<LoadedFileCodeArea />", () => {
  it("Display a file code when a file is opened and call a fs.writeFile when save button is clicked", async () => {
    const fileInput = screen.getByTestId("file-input");
    const openButton = screen.getByRole("button", { name: "Open" });
    const saveButton = screen.getByRole("button", { name: "Save" });

    const mockFile = new File(["test"], "test.js", { path: "test/path" });
    fs.readFileSync.mockReturnValue("test code");
    fs.writeFile = jest.fn();

    fireEvent.click(openButton);
    fireEvent.change(fileInput, {
      target: {
        files: [mockFile],
      },
    });

    expect(await screen.findByText("test code")).toBeInTheDocument();

    fireEvent.click(saveButton);
    expect(fs.writeFile).toHaveBeenCalled();
  });

  it("Move to a preview page when preview button is clicked", () => {
    const previewButton = screen.getByRole("button", { name: "Preview" });
    fireEvent.click(previewButton);

    expect(screen.getByText("/preview")).toBeInTheDocument();
  });
});
