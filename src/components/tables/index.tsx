import { useSelector } from "react-redux"
import { DataTable } from "./dataTable"
import { RootState } from "store/store"
import { INewData } from "@store/reducers/tableData"
import { parse } from "date-fns"
import data from "@json/data.json"

export const Tables = () => {
    const incomeTableColor = `bg-lime-800`;
    const expenseTableColor = `bg-red-800`

    const tablesData = useSelector((state: RootState) => state.tablesData)
    const currentDate = useSelector((state: RootState) => state.newDate)

    const getMonthIdByName = (monthName: string) => {
        const month = data.months.find(month => month.name === monthName);
        return month ? month.id : "01";
    }

    const sortDataByDate = (data: INewData[]) => {
        return data.sort((a, b) => {
            const dateA = parse(a.date, "dd/MM/yy", new Date());
            const dateB = parse(b.date, "dd/MM/yy", new Date());
            return dateA.getTime() - dateB.getTime();
        });
    };

    const filterByDate = (data: INewData[]) => {
        const monthId = getMonthIdByName(currentDate.currentMonth);
        const yearShort = currentDate.currentYear.slice(-2);
        return data.filter(item => {
            const [, month, year] = item.date.split("/");
            return month === monthId && year === yearShort;
        })
    }

    const incomeData = filterByDate(sortDataByDate(tablesData.filter(data => data.valueOrigin === "income")));
    const expenseData = filterByDate(sortDataByDate(tablesData.filter(data => data.valueOrigin === "expense")));

    const calculateTotal = (data: INewData[], valueOrigin: string) => {
        const filteredData = filterByDate(data.filter(item => item.valueOrigin === valueOrigin));

        return filteredData.reduce((acc, current) => {
            const value = Number(current.value.replace("R$", ""));
            return acc + value;
        }, 0)
    };

    const finalBalance = () => {
        const totalIncome = calculateTotal(tablesData, "income");
        const totalExpense = calculateTotal(tablesData, "expense");
        const balance = totalIncome - totalExpense;

        return balance.toFixed(2);
    };

    const createAPdfFile = () => {
        window.print()
    };

    return (
        <section id="tables" className="flex flex-col items-center w-screen pb-4">
            <div
                id="pdfContent"
                className="w-full max-w-screen-xl flex flex-wrap justify-center p-4 gap-y-4 gap-x-1">

                <div className="w-full flex-1 min-w-80">
                    <h2 title="Ganhos" className="text-center pt-2 text-xl capitalize mb-2">Ganhos</h2>
                    <DataTable color={incomeTableColor} info={incomeData} />
                </div>

                <div className="w-full flex-1 min-w-80">
                    <h2 title="Gastos" className="text-center pt-2 text-xl capitalize mb-2">Gastos</h2>
                    <DataTable color={expenseTableColor} info={expenseData} />
                </div>

                <div className="w-full max-w-3xl flex border-black justify-center">
                    <div className="flex flex-col items-center gap-1">
                        <h3 className=" text-center  break-all text-xl capitalize">Saldo final:</h3>
                        <p className="text-center capitalize break-all font-normal text-3xl border px-3 py-1 rounded-lg border-lime-700 text-white bg-lime-500 shadow-inner shadow-lime-700"
                        >R$ {finalBalance()}</p>
                    </div>
                </div>
            </div>
            <button
                onClick={() => createAPdfFile()}
                className="w-fit font-medium text-xl capitalize border-lime-500 border mt-4  text-lime-500 p-2 rounded-md duration-500 hover:bg-lime-500 hover:text-white hover:border-white hover:shadow-inner hover:shadow-lime-700"
            >
                Baixar Como PDF
            </button>
        </section>
    )
}