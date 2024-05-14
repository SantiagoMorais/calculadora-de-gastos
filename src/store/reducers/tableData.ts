import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface INewData {
    id: number;
    category: string,
    date: string,
    description: string,
    value: number,
}

const initialState: INewData[] = []

const newDataSlice = createSlice({
    name: "newData",
    initialState,
    reducers: {
        addNewData (state, action: PayloadAction<INewData>) {
            // state.push(action.payload);
            return [...state, action.payload]
        },
        removeTableData (state, action: PayloadAction<number>) {
            const idToRemove = action.payload;
            return state.filter(data => data.id !== idToRemove)
        }
    }
})

export const { addNewData, removeTableData } = newDataSlice.actions;
export default newDataSlice.reducer;