import { useSelector } from "react-redux"
import { DataTable } from "./dataTable"
import { RootState } from "store/store"
import { INewData } from "@store/reducers/tableData"

export const Tables = () => {
    const incomeTableColor = "bg-green-200"
    const expenseTableColor = "bg-red-200"

    const tablesData = useSelector((state: RootState) => state.tablesData)

    const incomeData = tablesData.filter(data => data.valueOrigin === "income")
    const expenseData = tablesData.filter(data => data.valueOrigin === "expense")

    const calculateTotal = (data: INewData[], valueOrigin: string) => {
        return data
            .filter(item => item.valueOrigin === valueOrigin)
            .reduce((acc, current) => {
                const value = Number(current.value.replace("R$", ""));
                return acc + value;
            }, 0);
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
        <section className="flex flex-col items-center w-screen pb-4">
            <div
                id="pdfContent"
                className="w-full max-w-screen-xl flex flex-wrap justify-center p-4 gap-y-4 gap-x-1">

                <div className="w-full flex-1 min-w-80">
                    <h2 title="Ganhos" className="text-center pt-2 text-xl capitalize mb-2">entrada</h2>
                    <DataTable color={incomeTableColor} info={incomeData} />
                </div>

                <div className="w-full flex-1 min-w-80">
                    <h2 title="Gastos" className="text-center pt-2 text-xl capitalize mb-2">saida</h2>
                    <DataTable color={expenseTableColor} info={expenseData} />
                </div>

                <div className="w-full max-w-3xl flex border-black justify-center">
                    <div className="flex flex-col items-center gap-1">
                        <h3 className=" text-center  break-all text-xl capitalize">Saldo final:</h3>
                        <p className="text-center capitalize break-all font-normal text-3xl border px-3 py-1 rounded-lg border-sky-700 text-white bg-sky-300 shadow-inner shadow-sky-700"
                        >R$ {finalBalance()}</p>
                    </div>
                </div>
            </div>
            <button
                onClick={() => createAPdfFile()}
                className="w-fit font-medium text-xl capitalize border-sky-500 border mt-4  text-sky-500 p-2 rounded-md duration-500 hover:bg-sky-300 hover:text-white hover:border-white hover:shadow-inner hover:shadow-sky-700"
            >
                Baixar Como PDF
            </button>
        </section>
    )
}