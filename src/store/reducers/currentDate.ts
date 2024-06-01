import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import data from "@json/data.json"

export interface ICurrentMonth {
    number: number,
    month: string
}
export interface ICurrentDate {
    currentMonth: ICurrentMonth,
    currentYear: number
}

const date = new Date();
const year = date.getFullYear();
const currentDate: ICurrentDate = {
    currentMonth: {
        number: data.months[date.getMonth()].id,
        month: data.months[date.getMonth()].name,
    },
    currentYear: year,
}

const initialState: ICurrentDate = currentDate;

const newDateSlice = createSlice({
    name: "newDate",
    initialState,
    reducers: {
        changeCurrentDate(state, action: PayloadAction<ICurrentDate>) {
            state.currentMonth = action.payload.currentMonth;
            state.currentYear = action.payload.currentYear;
        }
    }
})

export const { changeCurrentDate } = newDateSlice.actions;
export default newDateSlice.reducer;