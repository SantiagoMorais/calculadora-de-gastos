import { RootState } from "@store/store";

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('expenseCalculatorTable');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error("Could not load state", err);
        return undefined;
    }
};

export const saveState = (state: RootState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('expenseCalculatorTable', serializedState);
    } catch (err) {
        console.error("Could not save state", err);
    }
};
