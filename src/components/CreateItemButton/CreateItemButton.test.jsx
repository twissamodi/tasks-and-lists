import { fireEvent, render, screen } from "@testing-library/react";
import CreateItemButton from './CreateItemButton.jsx'


const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({ useNavigate: () => mockNavigate }));
describe("button testing", () => {
  it("should call onClick prop when the button is clicked", () => {
    render(<CreateItemButton action={'Add List'} path={'/lists/add-list'}/>);
    expect(screen.getByText("Add List")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Add List"));
    expect(mockNavigate).toHaveBeenCalledWith('/lists/add-list');
  });
});
