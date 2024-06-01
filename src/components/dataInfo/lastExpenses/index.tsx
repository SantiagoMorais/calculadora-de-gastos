import { useLastSixMonthData } from "@hooks/useLastSixMonthData";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export const LastExpenses = () => {
    const { differencePerMonth, expenseTotal, incomeTotal } = useLastSixMonthData();
    const [selectedCategory, setSelectedCategory] = useState<string>("difference");

    const dataOptions = [
        { message: "Ganhos dos últimos 6 meses", type: "income" },
        { message: "Gastos dos últimos 6 meses", type: "expense" },
        { message: "Saldo final dos últimos 6 meses", type: "difference" }
    ];

    const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
    };

    const getChartData = () => {
        switch (selectedCategory) {
            case "income":
                return Object.keys(incomeTotal).map(key => ({
                    monthYear: key,
                    valor: incomeTotal[key] ?? 0
                }));
            case "expense":
                return Object.keys(expenseTotal).map(key => ({
                    monthYear: key,
                    valor: expenseTotal[key] ?? 0
                }));
            case "difference":
            default:
                return Object.keys(differencePerMonth).map(key => ({
                    monthYear: key,
                    valor: differencePerMonth[key] ?? 0
                }));
        }
    };

    return (
        <section id="lastExpenses" className="flex-1 h-72 bg-zinc-900 rounded-md border border-white p-2 flex min-w-60 flex-col gap-2">
            <h2 className="text-base w-full border-b h-fit capitalize md:text-xl">Gráficos de Desempenho Financeiro</h2>
                <select
                    onChange={handleChangeCategory}
                    value={selectedCategory}
                    name="category"
                    className="bg-zinc-800 rounded-md border px-1 h-8"
                >
                    {dataOptions.map((option) =>
                        <option key={option.type} value={option.type}>
                            {option.message}
                        </option>
                    )}
                </select>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getChartData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="monthYear" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
                    <Legend />
                    <Bar dataKey="valor" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </section>
    );
};
