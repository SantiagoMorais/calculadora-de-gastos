import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tablesDataReducer from "./reducers/tableData"

const rootReducer = combineReducers({
    tablesData: tablesDataReducer,
})

export const store = configureStore({reducer: rootReducer});

export type RootState = ReturnType<typeof store.getState>;
