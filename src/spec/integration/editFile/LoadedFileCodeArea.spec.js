import fs from "fs";
import { render, screen, fireEvent } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { HashRouter } from "react-router-dom";
import LoadedFileCodeArea from "../../../components/editFile/LoadedFileCodeArea";

jest.mock("fs");

beforeEach(() => {
  render(
    <RecoilRoot>
      <LoadedFileCodeArea />
    </RecoilRoot>,
    { wrapper: HashRouter },
  );
});

describe("<LoadedFileCodeArea />", () => {
  it("Display a file code when a file is opened and succeed to save when save button is clicked", async () => {
    const fileInput = screen.getByTestId("file-input");
    const openButton = screen.getByRole("button", { name: "Open" });
    const saveButton = screen.getByRole("button", { name: "Save" });

    const mockFile = new File(["test"], "test.js", { path: "test/path" });
    fs.readFileSync.mockReturnValue("test code");
    fs.writeFile.mockImplementation(() => {});

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
});
