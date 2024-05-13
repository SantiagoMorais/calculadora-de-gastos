import { DataTable } from "./dataTable"

export const Tables = () => {
    const incomeTableColor = "bg-green-100"
    const expenseTableColor = "bg-red-100"

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