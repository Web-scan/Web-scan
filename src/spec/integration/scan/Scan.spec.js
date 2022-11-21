import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import axios from "axios";
import Scan from "../../../pages/Scan";
import sampleWebsiteHtml from "../../__mocks__/sampleWebsiteHtml";

let dom;
jest.mock("axios");

beforeAll(() => {
  const element = document.createElement("div");
  element.setAttribute("id", "modal");
  const body = document.querySelector("body");
  body.appendChild(element);
});

describe("<Scan /> before website is loaded", () => {
  beforeEach(async () => {
    await waitFor(() => {
      dom = render(
        <RecoilRoot>
          <Scan />
        </RecoilRoot>,
        { wrapper: HashRouter },
      );
    });
  });

  it("Display landing message and do not display a editor", async () => {
    expect(
      screen.getByText("Let’s scan. Please enter a URL of the websites"),
    ).toBeInTheDocument();

    expect(dom.container.getElementsByClassName("editor").length).toBe(0);
  });

  it("Display website and a editor when input is submitted", async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({ status: 200, data: sampleWebsiteHtml }),
    );

    const urlInput = screen.getByPlaceholderText("Enter a URL of the website");

    fireEvent.change(urlInput, {
      target: { value: "https://sample-website-check-style.herokuapp.com/" },
    });
    fireEvent.submit(urlInput);

    expect(await screen.findByText("Sample website")).toBeInTheDocument();
  });

  it("Alert when invalid url is submitted", async () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});

    const urlInput = screen.getByPlaceholderText("Enter a URL of the website");

    fireEvent.change(urlInput, {
      target: { value: "mockUrl" },
    });
    fireEvent.submit(urlInput);

    expect(window.alert).toBeCalledWith("Invalid URL. Please check your input");
  });
});

describe("<Scan /> after website is loaded", () => {
  beforeEach(async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({ status: 200, data: sampleWebsiteHtml }),
    );

    await waitFor(() => {
      dom = render(
        <RecoilRoot>
          <Scan />
        </RecoilRoot>,
        { wrapper: HashRouter },
      );
      const urlInput = screen.getByPlaceholderText(
        "Enter a URL of the website",
      );

      fireEvent.change(urlInput, {
        target: { value: "https://sample-website-check-style.herokuapp.com/" },
      });
      fireEvent.submit(urlInput);
    });
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

    await waitFor(() => {
      expect(heading.classList.contains("highlight")).toBe(true);
    });
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
