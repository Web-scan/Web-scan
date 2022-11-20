import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../../../components/shared/Modal";

beforeAll(() => {
  const element = document.createElement("div");
  element.setAttribute("id", "modal");
  const body = document.querySelector("body");
  body.appendChild(element);
});

describe("<Modal />", () => {
  it("Show nothing when isModalOpen is false", () => {
    const isModalOpen = false;
    const handleClick = jest.fn();
    const header = "test header";
    const content = "test content";

    render(
      <Modal
        isModalOpen={isModalOpen}
        handleClick={handleClick}
        header={header}
        content={content}
      />,
    );

    const modal = screen.queryByText("test header");
    expect(modal).not.toBeInTheDocument();
  });

  it("Show correct header and content consistent with props and handleClick should work when close button is clicked", () => {
    const isModalOpen = true;
    const handleClick = jest.fn();
    const header = "test header";
    const content = "test content";

    render(
      <Modal
        isModalOpen={isModalOpen}
        handleClick={handleClick}
        header={header}
        content={content}
      />,
    );

    expect(screen.getByText(header)).toBeInTheDocument();
    expect(screen.getByText(content)).toBeInTheDocument();

    const button = screen.getByRole("button", { name: "Close" });

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
