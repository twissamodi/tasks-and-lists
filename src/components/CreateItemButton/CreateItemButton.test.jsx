import { fireEvent, render, screen } from "@testing-library/react";
import CreateItemButton from './CreateItemButton.jsx'

describe("button testing", () => {
  it("should call onClick prop when the button is clicked", () => {
    const text="click me";
    const onClick=jest.fn();
    render(<CreateItemButton onClick={onClick} buttonText={text}/>);
    expect(screen.getByText("click me")).toBeInTheDocument();
    fireEvent.click(screen.getByText("click me"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
