import { fireEvent, render, screen } from "@testing-library/react"
import { AddNewData } from "."
import { Provider } from "react-redux"
import { store } from "@store/store"

const renderWithProvider = (ui: React.JSX.Element) => {
    return render(
        <Provider store={store}>
            {ui}
        </Provider>
    )
}

describe("<AddNewData />", () => {
    it("should render the component", () => {
        renderWithProvider(<AddNewData />)
        const button = screen.getByText(/Adicione um novo dado/i);
        expect(button).toBeInTheDocument();
    })

    it("should render the button and the formWindow correctly", () => {
        renderWithProvider(<AddNewData />)
        const button = screen.getByTestId("addNewDataButton");
        const formWindow = screen.getByTestId("formWindow");

        expect(button).toBeInTheDocument();
        expect(formWindow).toBeInTheDocument();
    });

    it("should open the form window when the button is clicked", () => {
        renderWithProvider(<AddNewData />)
        const button = screen.getByTestId("addNewDataButton");
        const formWindow = screen.getByTestId("formWindow");

        expect(formWindow).toHaveClass("opacity-0 max-h-0");

        fireEvent.click(button)

        expect(formWindow).toHaveClass("opacity-100 max-h-screen");
    })
})