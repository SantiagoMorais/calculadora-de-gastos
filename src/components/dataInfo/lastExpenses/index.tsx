import { useLastSixMonthData } from "@hooks/useLastSixMonthData";
import { useState } from "react";
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";

interface IAddNewStickyNoteProps {
    defaultStyle: string,
}

export const LastExpenses: React.FC<IAddNewStickyNoteProps> = ({ defaultStyle }) => {
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
                    Valor: incomeTotal[key] ?? 0
                }));
            case "expense":
                return Object.keys(expenseTotal).map(key => ({
                    monthYear: key,
                    Valor: expenseTotal[key] ?? 0
                }));
            case "difference":
            default:
                return Object.keys(differencePerMonth).map(key => ({
                    monthYear: key,
                    Valor: differencePerMonth[key] ?? 0
                }));
        }
    };

    const customStroke = () => {
        switch (selectedCategory) {
            case "income":
                return "#20be00";
            case "expense":
                return "#ff332c";
            default:
                return "#20a6ff"
        }
    }

    return (
        <section id="lastExpenses" className={defaultStyle}>
            <h2 className="mb-1 text-base w-full border-b h-fit capitalize md:text-xl">Gráficos de Desempenho Financeiro</h2>
            <select
                onChange={handleChangeCategory}
                value={selectedCategory}
                name="category"
                className="mb-1 bg-zinc-800 rounded-md border px-1 h-8"
            >
                {dataOptions.map((option) =>
                    <option key={option.type} value={option.type}>
                        {option.message}
                    </option>
                )}
            </select>

            <ResponsiveContainer width="96%" height="100%">
                <LineChart data={getChartData()} margin={{ bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="monthYear" height={70} angle={90} textAnchor="start" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
                    <Legend />
                    <Line dot={{ stroke: "white", strokeWidth: 5 }} strokeWidth={3} type="linear" dataKey="Valor" stroke={customStroke()} />
                </LineChart>
            </ResponsiveContainer>
        </section>
    );
};
