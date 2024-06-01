import { RootState } from '@store/store';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export interface MonthlyData {
    [key: string]: number | null;
}

interface LastSixMonthData {
    incomeTotal: MonthlyData;
    expenseTotal: MonthlyData;
    differencePerMonth: MonthlyData;
}

export const useLastSixMonthData = (): LastSixMonthData => {
    const tablesData = useSelector((state: RootState) => state.tablesData);

    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    const lastSixMonths = useMemo(() => {
        return Array.from({ length: 6 }, (_, index) => {
            const month = currentMonth - index;
            if (month > 0) {
                return { month, year: currentYear };
            } else {
                return { month: month + 12, year: currentYear - 1 };
            }
        }).reverse();
    }, [currentMonth, currentYear]);

    const { incomeTotal, expenseTotal, differencePerMonth } = useMemo(() => {
        const incomeTotal: MonthlyData = {};
        const expenseTotal: MonthlyData = {};
        const differencePerMonth: MonthlyData = {};

        lastSixMonths.forEach(({ month, year }) => {
            const monthKey = `${month}/${year}`;
            const monthData = tablesData.filter(data => data.month === month && data.year === year);

            if (monthData.length > 0) {
                let monthIncomeTotal = 0;
                let monthExpenseTotal = 0;

                monthData.forEach(data => {
                    const value = Number(data.value);
                    if (data.valueOrigin === 'income') {
                        monthIncomeTotal += value;
                    } else if (data.valueOrigin === 'expense') {
                        monthExpenseTotal += value;
                    }
                });

                incomeTotal[monthKey] = monthIncomeTotal;
                expenseTotal[monthKey] = monthExpenseTotal;
                differencePerMonth[monthKey] = monthIncomeTotal - monthExpenseTotal;
            } else {
                incomeTotal[monthKey] = null;
                expenseTotal[monthKey] = null;
                differencePerMonth[monthKey] = null;
            }
        });

        return { incomeTotal, expenseTotal, differencePerMonth };
    }, [tablesData, lastSixMonths]);

    return { incomeTotal, expenseTotal, differencePerMonth };
};