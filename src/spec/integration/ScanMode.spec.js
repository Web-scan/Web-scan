import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import axios from "axios";
import { HashRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import ScanMode from "../../components/scan/ScanMode";

import sampleWebsiteHtml from "../__mocks__/sampleWebsiteHtml";

jest.mock("axios");

beforeAll(() => {
  const element = document.createElement("div");
  element.setAttribute("id", "modal");
  const body = document.querySelector("body");
  body.appendChild(element);
});

beforeEach(async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: sampleWebsiteHtml }),
  );

  const websiteUrl = "https://sample-website-check-style.herokuapp.com/";
  await waitFor(() => {
    render(
      <RecoilRoot>
        <ScanMode websiteUrl={websiteUrl} />
      </RecoilRoot>,
      { wrapper: HashRouter },
    );
  });
});

describe("<ScanMode />", () => {
  it("Display a website after getting html string after fetching", async () => {
    expect(await screen.findByText("Sample website")).toBeInTheDocument();
    expect(
      await screen.findByText(
        "tag which is sliding in the body and display is block",
      ),
    ).toBeInTheDocument();
  });

  it("There are no highlight on a element or style scan modal before mouse moves over a element", async () => {
    const heading = await screen.findByText("Sample website");
    const styleScanModal = await screen.queryByTestId("style-scan-modal");

    expect(heading.classList.contains("highlight")).toBe(false);
    expect(styleScanModal).not.toBeInTheDocument();
  });

  it("Highlight the element when mouse is moving over a element", async () => {
    const heading = await screen.findByText("Sample website");
    fireEvent.mouseMove(heading);

    expect(heading.classList.contains("highlight")).toBe(true);
  });

  it("Display custom style information modal when mouse is moving over a element", async () => {
    const heading = await screen.findByText("Sample website");
    fireEvent.mouseMove(heading);

    const styleScanModal = await screen.findByTestId("style-scan-modal");
    expect(styleScanModal).toBeInTheDocument();
  });

  it("Display component code in side editor when a element is clicked", async () => {
    const heading = await screen.findByText("Sample website");
    fireEvent.click(heading);

    expect(await screen.findByText("const")).toBeInTheDocument();
    expect(await screen.findByText("Component = () => {")).toBeInTheDocument();
  });

  it("Copy a code in clipboard when copy button is clicked", async () => {
    global.navigator.clipboard = {
      writeText: jest.fn(),
    };

    const button = screen.getByRole("button", { name: "Copy" });

    fireEvent.click(button);

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });
});
