import { render, screen } from "@testing-library/react"
import { NavBar } from "."
import logoImage from "@assets/imgs/logo.jpg"

describe("navbar", () => {
    it("should render the component correctly", () => {
        render(<NavBar />)
        const title = screen.getByText(/farol financeiro/i);
        expect(title).toBeInTheDocument();
    })

    it("should render the items from navbar", () => {
        render(<NavBar />);
        const items = screen.getAllByRole("listitem");
        expect(items).toHaveLength(3)
    })

    it("should render the logo", () => {
        render(<NavBar />)
        const logo = screen.getByRole("img");
        expect(logo).toHaveAttribute("src", logoImage)
    })
})