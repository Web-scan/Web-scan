import fs from "fs";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { HashRouter, useLocation } from "react-router-dom";
import { RecoilRoot } from "recoil";

import LoadedFileCodeArea from "../../../components/editFile/LoadedFileCodeArea";

jest.mock("fs", () => ({
  readFileSync: jest.fn(),
  promises: {
    writeFile: jest.fn(),
  },
}));

const PathLocation = () => {
  const location = useLocation();
  return <div>{location.pathname}</div>;
};

beforeAll(() => {
  const element = document.createElement("div");
  element.setAttribute("id", "modal");

  const body = document.querySelector("body");
  body.appendChild(element);
});

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

    fireEvent.click(openButton);
    fireEvent.change(fileInput, {
      target: {
        files: [mockFile],
      },
    });
    await waitFor(async () => {
      expect(await screen.findByText("test code")).toBeInTheDocument();
      fireEvent.click(saveButton);
      expect(fs.promises.writeFile).toHaveBeenCalled();
    });
  });

  it("Move to a preview page when preview button is clicked", () => {
    const previewButton = screen.getByRole("button", { name: "Preview" });
    fireEvent.click(previewButton);

    expect(screen.getByText("/preview")).toBeInTheDocument();
  });
});
