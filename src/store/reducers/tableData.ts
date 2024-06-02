import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface INewData {
    id: number,
    category: string,
    day: number,
    month: number,
    year: number,
    description: string,
    value: string,
    valueOrigin: string,
    period: number
}

const initialState: INewData[] = []

const newDataSlice = createSlice({
    name: "newData",
    initialState,
    reducers: {
        addNewData(state, action: PayloadAction<INewData>) {
            return [...state, action.payload].map((item, index) => ({ ...item, id: index }));
        },
        removeTableData(state, action: PayloadAction<number>) {
            const idToRemove = action.payload;
            return state.filter(data => data.id !== idToRemove)
        }
    }
})

export const { addNewData, removeTableData } = newDataSlice.actions;
export default newDataSlice.reducer;