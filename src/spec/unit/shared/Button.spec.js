import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../../../components/shared/Button";

describe("<Button />", () => {
  it("Display a correct text and handleClick should work when button is clicked", () => {
    const text = "test text";
    const handleClick = jest.fn();
    render(<Button text={text} onClick={handleClick} />);
    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("test text");

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("Have specific styles consistent with default prop styles", () => {
    const text = "test text";
    const handleClick = jest.fn();
    render(<Button text={text} onClick={handleClick} />);
    const button = screen.getByRole("button", { name: "test text" });

    expect(button).toHaveStyle("margin-right: 0px");
    expect(button).toHaveStyle("width: 80px");
    expect(button).toHaveStyle("height: 30px");
    expect(button).toHaveStyle("border-radius: 10px");
    expect(button).toHaveStyle("background-color: #EFEEEE");
  });

  it("Have specific styles consistent with props", () => {
    const props = {
      text: "test text",
      marginRight: "10px",
      width: "100px",
      height: "100px",
      borderRadius: "20px",
      backgroundColor: "red",
    };
    const handleClick = jest.fn();

    render(
      <Button
        text={props.text}
        onClick={handleClick}
        marginRight={props.marginRight}
        width={props.width}
        height={props.height}
        borderRadius={props.borderRadius}
        backgroundColor={props.backgroundColor}
      />,
    );
    const button = screen.getByRole("button", { name: "test text" });

    expect(button).toHaveStyle("margin-right: 10px");
    expect(button).toHaveStyle("width: 100px");
    expect(button).toHaveStyle("height: 100px");
    expect(button).toHaveStyle("border-radius: 20px");
    expect(button).toHaveStyle("background-color: red");
  });
});
