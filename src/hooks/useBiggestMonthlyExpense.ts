import { INewData } from "@store/reducers/tableData";
import { useDataFilteredByDate } from "./useDataFilteredByDate"
import { useMemo } from "react";

interface IBiggestMonthlyExpense {
    category: string;
    totalValue: number;
    data: INewData[];
}

export const useBiggestMonthlyExpense = (): IBiggestMonthlyExpense | null => {
    const dataFilteredByDate = useDataFilteredByDate();

    const expenseData = useMemo(() => {
        return dataFilteredByDate.filter(data => data.valueOrigin === "expense");
    }, [dataFilteredByDate]);

    const biggestExpenseCategory = useMemo(() => {
        const categoryTotals: { [key: string]: { total: number; items: INewData[] } } = {};

        expenseData.forEach(item => {
            const category = item.category;
            const value = parseFloat(item.value);

            if (!categoryTotals[category]) {
                categoryTotals[category] = { total: 0, items: [] };
            }

            categoryTotals[category].total += value;
            categoryTotals[category].items.push(item);
        });

        let maxCategory = null;
        let maxTotal = -Infinity;

        for (const category in categoryTotals) {
            if (categoryTotals[category].total > maxTotal) {
                maxTotal = categoryTotals[category].total;
                maxCategory = category;
            }
        }

        if (maxCategory) {
            return {
                category: maxCategory,
                totalValue: categoryTotals[maxCategory].total,
                data: categoryTotals[maxCategory].items,
            };
        }

        return null;
    }, [expenseData]);

    return biggestExpenseCategory;
};