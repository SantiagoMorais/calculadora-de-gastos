import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AddNewStickyNote } from "./addNewStickyNote"
import { BiggestExpenseData } from "./biggestExpenseData"
import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { LastExpenses } from "./lastExpenses"
import { ExpensesChart } from "./expensesChart"

export const DataInfo = () => {
    const defaultStyle = "flex-1 h-96 bg-zinc-900 rounded-md border border-white p-2 flex min-w-72 flex-col gap-2"

    return (
        <section id="informations" className="flex w-screen justify-center flex-col items-center">
            <h2 className="px-2 uppercase text-xl mb-4 flex items-center gap-4 text-center md:text-3xl">
                <FontAwesomeIcon icon={faCircle} className="text-sm" />
                Informações Adicionais
                <FontAwesomeIcon icon={faCircle} className="text-sm" />
            </h2>
            <div className="w-full max-w-screen-xl px-4 grid gap-4 grid-cols-1 sm:grid-cols-2">
                <LastExpenses defaultStyle={defaultStyle} />
                <ExpensesChart defaultStyle={defaultStyle} />
                <BiggestExpenseData defaultStyle={defaultStyle} />
                <AddNewStickyNote defaultStyle={defaultStyle} />
            </div>
        </section>
    )
}