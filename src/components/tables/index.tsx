import { useSelector } from "react-redux"
import { DataTable } from "./dataTable"
import { RootState } from "store/store"

export const Tables = () => {
    const incomeTableColor = "bg-green-100"
    const expenseTableColor = "bg-red-100"
    const tablesData = useSelector((state: RootState) => state.tablesData)
    console.log(tablesData);
    

    return (
        <section className="flex justify-center w-screen">
            <div className="w-full max-w-screen-xl flex flex-wrap">

                <div className="w-full flex-1 min-w-80">
                    <h2 className="text-center pt-2 text-xl capitalize">entrada</h2>
                    <DataTable color={incomeTableColor} />
                </div>

                <div className="w-full flex-1 min-w-80">
                    <h2 className="text-center pt-2 text-xl capitalize">saida</h2>
                    <DataTable color={expenseTableColor} />
                </div>
            </div>
        </section>
    )
}