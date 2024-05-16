import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tablesDataskyucer from "./reducers/tableData"
import { loadState, saveState } from "../localStorage/localStorage"

const rootskyucer = combineReducers({
    tablesData: tablesDataskyucer,
})

const store = configureStore({
    reducer: rootskyucer,
    preloadedState: loadState(),
});

store.subscribe(() => {
    saveState(store.getState());
})

export type RootState = ReturnType<typeof rootskyucer>;
export type AppDispatch = typeof store.dispatch;

export { store };
