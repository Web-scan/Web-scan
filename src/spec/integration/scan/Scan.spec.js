import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import axios from "axios";
import Scan from "../../../pages/Scan";
import sampleWebsiteHtml from "../../__mocks__/sampleWebsiteHtml";

let dom;
jest.mock("axios");

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

describe("<Scan />", () => {
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
