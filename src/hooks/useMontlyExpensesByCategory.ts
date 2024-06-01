import { useMemo } from "react";
import { useDataFilteredByDate } from "./useDataFilteredByDate";
import { INewData } from "@store/reducers/tableData";

interface ICategoryExpense {
    category: string;
    totalValue: number;
    expenses: INewData[];
}

export const useMonthlyExpensesByCategory = (): ICategoryExpense[] => {
    const dataFilteredByDate = useDataFilteredByDate();

    const expensesByCategory = useMemo(() => {
        const categoryMap: { [key: string]: { totalValue: number; expenses: INewData[] } } = {};

        dataFilteredByDate.forEach((data) => {
            if (data.valueOrigin === "expense") {
                if (!categoryMap[data.category]) {
                    categoryMap[data.category] = {
                        totalValue: 0,
                        expenses: [],
                    };
                }
                const value = parseFloat(data.value) || 0;
                categoryMap[data.category].totalValue += value;
                categoryMap[data.category].expenses.push(data);
            }
        });

        return Object.keys(categoryMap).map((category) => ({
            category,
            totalValue: parseFloat(categoryMap[category].totalValue.toFixed(2)),
            expenses: categoryMap[category].expenses,
        }));
    }, [dataFilteredByDate]);

    return expensesByCategory;
};
