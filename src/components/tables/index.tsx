import { useSelector } from "react-redux"
import { DataTable } from "./dataTable"
import { RootState } from "store/store"
import { INewData } from "@store/reducers/tableData"

export const Tables = () => {
    const incomeTableColor = "bg-green-100"
    const expenseTableColor = "bg-red-100"

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

    return (
        <section className="flex justify-center w-screen">
            <div className="w-full max-w-screen-xl flex flex-wrap justify-center p-4 gap-4">

                <div className="w-full flex-1 min-w-80">
                    <h2 title="Ganhos" className="text-center pt-2 text-xl capitalize mb-2">entrada</h2>
                    <DataTable color={incomeTableColor} info={incomeData} />
                </div>

                <div className="w-full flex-1 min-w-80">
                    <h2 title="Gastos" className="text-center pt-2 text-xl capitalize mb-2">saida</h2>
                    <DataTable color={expenseTableColor} info={expenseData} />
                </div>

                <div className="w-full max-w-3xl flex border-black justify-center">
                    <div className="flex items-center gap-4">
                        <h3 className=" text-center  break-all text-2xl capitalize">Saldo final</h3>
                        <p className="text-center capitalize break-all bg-blue-100 p-2 rounded-md border border-black font-normal text-2xl" 
                        >R$ {finalBalance()}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}