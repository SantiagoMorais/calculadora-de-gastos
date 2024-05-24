import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ICurrentDate {
    currentMonth: string,
    currentYear: string
}

const date = new Date();
const currentDate: ICurrentDate = {
    currentMonth: (date.getMonth() + 1).toString(),
    currentYear: (date.getFullYear()).toString()
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