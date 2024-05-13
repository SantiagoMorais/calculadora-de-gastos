import { render, screen } from "@testing-library/react"
import { NavBar } from "."

describe("navbar", () => {
    it("should render the component correctly", () => {
        render(<NavBar />)
        const title = screen.getByText(/calculadora de gastos/i);
        expect(title).toBeInTheDocument();
    })

    it("should render the items from navbar", () => {
        render(<NavBar />);
        const items = screen.getAllByRole("listitem");
        expect(items).toHaveLength(3)
    })
})