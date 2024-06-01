import { useMonthlyExpensesByCategory } from "@hooks/useMontlyExpensesByCategory"
import { RootState } from "@store/store"
import { useSelector } from "react-redux"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface IAddNewStickyNoteProps {
    defaultStyle: string,
}


export const ExpensesChart: React.FC<IAddNewStickyNoteProps> = ({ defaultStyle }) => {
    const currentDate = useSelector((state: RootState) => state.newDate)
    const expensesData = useMonthlyExpensesByCategory();

    const renderCurrentDate = `${currentDate.currentMonth.month} / ${currentDate.currentYear.toFixed().slice(2)}`

    const getChartData = () => {
        const maxLenght = 6;
        return expensesData.map(data => {
            return {
                Categoria: data.category.length > maxLenght ? data.category.slice(0, maxLenght) + "." : data.category,
                "Valor Total": data.totalValue
            }
        })
    }

    return (
        <section id="expensesChart" className={defaultStyle}>
            <h2 className="text-base w-full border-b h-fit capitalize md:text-xl">Gráficos de despesas - {renderCurrentDate}</h2>

            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getChartData()} margin={{bottom: 10}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Categoria" style={{ fontSize: '12x' }} angle={90} textAnchor="start" height={70}/>
                    <YAxis />
                    <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
                    <Legend />
                    <Bar dataKey="Valor Total" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </section>
    )
}