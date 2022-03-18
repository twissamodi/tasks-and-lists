import { fireEvent, render, screen } from "@testing-library/react";
import CreateItemButton from './CreateItemButton.jsx'
import ReactRouterDom, { useNavigate } from "react-router-dom"

describe("button testing", () => {
  it("should call onClick prop when the button is clicked", () => {
    const navigate=jest.mock('ReactRouterDom').mockImplementation(()=>useNavigate=>()=>jest.fn());
    const navigate=jest.fn();
    render(<CreateItemButton action={'Add List'} path={'/lists/add-list'}/>);
    expect(screen.getByText("Add List")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Add List"));
    expect(navigate).toHaveBeenCalledWith('/lists/add-list');
  });
});
