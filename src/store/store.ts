import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tablesDataReducer from "./reducers/tableData"
import { loadState, saveState } from "../localStorage/tableDataLocalStorage"
import newDateReducer from "./reducers/currentDate"
import addStickyNotesReducer from "./reducers/stickyNotes"

const rootReducer = combineReducers({
    tablesData: tablesDataReducer,
    newDate: newDateReducer,
    stickyNotes: addStickyNotesReducer
})

const store = configureStore({
    reducer: rootReducer,
    preloadedState: loadState(),
});

store.subscribe(() => {
    saveState(store.getState());
})

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export { store };
