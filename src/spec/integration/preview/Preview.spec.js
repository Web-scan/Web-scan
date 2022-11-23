import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

import Preview from "../../../pages/Preview";
import { HEADER_INPUT, LANDING_MESSAGE } from "../../../constants/ui";

beforeEach(async () => {
  await waitFor(() => {
    render(
      <RecoilRoot>
        <Preview />
      </RecoilRoot>,
      { wrapper: HashRouter },
    );
  });
});

describe("<Preview />", () => {
  it("Display landing page", () => {
    expect(
      screen.getByPlaceholderText(HEADER_INPUT.LOCALHOST),
    ).toBeInTheDocument();
    expect(screen.getByText(LANDING_MESSAGE.PREVIEW)).toBeInTheDocument();
  });

  it("Have a localhost url as a value of src attribute of the iframe when url is submitted", async () => {
    const urlInput = screen.getByPlaceholderText(HEADER_INPUT.LOCALHOST);
    fireEvent.change(urlInput, {
      target: { value: "https://sample-website-check-style.herokuapp.com/" },
    });
    fireEvent.submit(urlInput);

    expect(screen.queryByText(LANDING_MESSAGE.PREVIEW)).not.toBeInTheDocument();

    const iframe = screen.getByTestId("web-frame");
    expect(iframe).toHaveAttribute(
      "src",
      "https://sample-website-check-style.herokuapp.com/",
    );
  });
});
