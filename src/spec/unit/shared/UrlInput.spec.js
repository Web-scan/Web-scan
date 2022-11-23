import { render, screen, fireEvent } from "@testing-library/react";
import UrlInput from "../../../components/shared/UrlInput";

describe("<UrlInput />", () => {
  it("Display correct value and placeholder. Also both handleChange and handleSubmit should work", () => {
    const value = "test text";
    const handleChange = jest.fn();
    const handleSubmit = jest.fn();
    const placeholder = "test placeholder";
    render(
      <UrlInput
        value={value}
        onChange={handleChange}
        onSubmit={handleSubmit}
        placeholder={placeholder}
      />,
    );
    const inputBar = screen.getByRole("textbox");

    expect(inputBar).toHaveAttribute("placeholder", placeholder);
    expect(inputBar.value).toBe(value);

    fireEvent.change(inputBar, { target: { value: "text change" } });
    expect(handleChange).toHaveBeenCalled();

    fireEvent.submit(inputBar);
    expect(handleSubmit).toHaveBeenCalled();
  });
});
