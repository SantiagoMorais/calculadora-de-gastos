import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ICurrentDate {
    day: number;
    month: number;
    year: number;
}

export interface IStickyNotes {
    note: string;
    date: ICurrentDate;
    id: number;
    checked: boolean
}

const initialState: IStickyNotes[] = [];

const stickyNotesSlice = createSlice({
    name: "stickyNotes",
    initialState,
    reducers: {
        addNewStickyNote(state, action: PayloadAction<IStickyNotes>) {
            return [...state, action.payload].map((item, index) => ({ ...item, id: index }))
        },
        removeStickyNote(state, action: PayloadAction<number>) {
            const idToRemove = action.payload;
            return state.filter(data => data.id !== idToRemove)
        },
        toggleCheckedStickyNote(state, action: PayloadAction<number>) {
            const idToToggle = action.payload;
            const note = state.find(data => data.id === idToToggle);
            if (note) note.checked = !note.checked
        }
    }
});

export const { addNewStickyNote, removeStickyNote, toggleCheckedStickyNote } = stickyNotesSlice.actions;
export default stickyNotesSlice.reducer;
