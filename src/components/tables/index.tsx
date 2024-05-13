import { DataTable } from "../dataTable"

export const Tables = () => {
    const incomeTableColor = "bg-green-100"
    const expenseTableColor = "bg-red-100"

    return (
        <>
            <h2 className="text-center pt-2 text-xl capitalize">entrada</h2>
            <DataTable color={incomeTableColor} />
            <h2 className="text-center pt-2 text-xl capitalize">saida</h2>
            <DataTable color={expenseTableColor} />
        </>
    )
}