import { fireEvent, render, screen } from "@testing-library/react"
import { TimeLine } from "."
import { Provider } from "react-redux";
import { store } from "@store/store";
import { changeCurrentDate } from "@store/reducers/currentDate";
import data from "@json/data.json"

const renderWithProvider = (ui: React.JSX.Element) => {
    return render(
        <Provider store={store}>
            {ui}
        </Provider>
    )
}

describe("<TimeLine />", () => {
    it("should render the component correctly", () => {
        renderWithProvider(<TimeLine />)
        const component = screen.getByTestId("timeLineSection")
        expect(component).toBeInTheDocument();
    });

    it("should the rendered year be the current year", () => {
        renderWithProvider(<TimeLine />);
        
        const date = new Date();
        const currentYear = date.getFullYear().toString();
        const selectedYear = screen.getByRole("heading");

        expect(selectedYear.textContent).toBe(currentYear);
    })
    
    it("should be possible to change the year selected", () => {
        renderWithProvider(<TimeLine />);
        const buttons = screen.getAllByTestId("changeYear");
        const date = new Date();
        const currentYear = date.getFullYear();
        const currentYearToString = date.getFullYear().toString();
        const selectedYear = screen.getByRole("heading");

        const reduceYearButton = buttons[0];
        const increaseYearButton = buttons[1];

        const pastYear = (currentYear - 1).toString()
        const nextYear = (currentYear + 1).toString()

        fireEvent.click(reduceYearButton);
        expect(selectedYear.textContent).toBe(pastYear)

        fireEvent.click(increaseYearButton);
        expect(selectedYear.textContent).toBe(currentYearToString)

        fireEvent.click(increaseYearButton);
        expect(selectedYear.textContent).toBe(nextYear)
    })

    it("should be able to change the year selected and update the store from redux", () => {
        renderWithProvider(<TimeLine />)
        const date = new Date();
        
        const changeYearButtons = screen.getAllByTestId("changeYear");
        const decreaseYearButton = changeYearButtons[0];
        const increaseYearButton = changeYearButtons[1];
        
        const currentYear = date.getFullYear().toString();
        const nextYear = (date.getFullYear() + 1).toString();
        const lastYear = (date.getFullYear() - 1).toString();


        fireEvent.click(increaseYearButton);
        expect(store.getState().newDate.currentYear).toBe(nextYear);

        fireEvent.click(decreaseYearButton)
        expect(store.getState().newDate.currentYear).toBe(currentYear);

        fireEvent.click(decreaseYearButton)
        expect(store.getState().newDate.currentYear).toBe(lastYear);
    })
    
    it("should render the months correctly", () => {
        renderWithProvider(<TimeLine />);
        const months = screen.getAllByTestId("month");
        expect(months).toHaveLength(12);
    })

    it("should be able to change the month selected and update the store from redux", () => {
        renderWithProvider(<TimeLine />);
        const monthButtons = screen.getAllByTestId("month");
        const januaryButton = monthButtons[0];

        const dispatchSpy = vi.spyOn(store, "dispatch");

        fireEvent.click(januaryButton);

        expect(dispatchSpy).toHaveBeenCalledWith(
            changeCurrentDate({
                currentMonth: "Janeiro",
                currentYear: store.getState().newDate.currentYear,
            })
        )

        expect(store.getState().newDate.currentMonth).toBe(data.months[0].name);
    })

    it("should return to the current date when we click to the button responsible to do it", () => {
        renderWithProvider(<TimeLine />)
        const date = new Date()
        const nextYear = (date.getFullYear() + 1).toString();
        const nextMonth = data.months[date.getMonth() < 12 ? date.getMonth() + 1 : 0].name

        const currentYear = date.getFullYear().toString()
        const currentMonth = data.months[date.getMonth()].name;

        const changeYearButtons = screen.getAllByTestId("changeYear");
        const increaseYearButton = changeYearButtons[1];

        const monthButtons = screen.getAllByTestId("month");
        const nextMonthButton = monthButtons[date.getMonth() < 12 ? date.getMonth() + 1 : 0];

        fireEvent.click(increaseYearButton);
        fireEvent.click(nextMonthButton);

        expect(store.getState().newDate.currentYear).toBe(nextYear);
        expect(store.getState().newDate.currentMonth).toBe(nextMonth)

        const changeItToCurrentDateButton = screen.getByText(/Hoje/i);
        fireEvent.click(changeItToCurrentDateButton)

        expect(store.getState().newDate.currentYear).toBe(currentYear);
        expect(store.getState().newDate.currentMonth).toBe(currentMonth)
    })
})