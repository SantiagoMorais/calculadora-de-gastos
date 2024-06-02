import { useBiggestMonthlyExpense } from "@hooks/useBiggestMonthlyExpense"

interface IAddNewStickyNoteProps {
    defaultStyle: string,
}

export const BiggestExpenseData: React.FC<IAddNewStickyNoteProps> = ({defaultStyle}) => {
    const biggestMontlyExpenseData = useBiggestMonthlyExpense();

    const renderTotalValue = biggestMontlyExpenseData?.totalValue.toFixed(2);
    const renderCategory = biggestMontlyExpenseData?.category ? biggestMontlyExpenseData?.category : "Nenhum"
    const renderDate = (day: number, month: number, year: number) => {
        return `${day < 10 ? `0${day}` : day} / ${month < 10 ? `0${month}` : month} / ${year.toString().slice(2)}`
    }
    const renderValue = (value: string) => Number(value).toFixed(2)

    const dataStyle = "capitalize border-r flex-1 text-center"
    
    return (
        <section id="biggestExpenseData" className={defaultStyle}>
            <h2 className="mb-1 text-base w-full border-b h-fit capitalize md:text-xl">Maior gasto mensal</h2>
            <div className="flex flex-col gap-1">
                <p className="capitalize flex justify-center items-center text-lg flex-wrap gap-2">
                    {renderCategory}:<span className="bg-red-600 px-2 rounded-md border">R$ {renderTotalValue}</span>
                </p>
            </div>
            <div className="h-fit max-h-full overflow-y-scroll border border-r-0">
                {biggestMontlyExpenseData && biggestMontlyExpenseData.data.map((item, index) =>
                    <div key={index} className="flex w-full justify-between odd:bg-zinc-700">
                        <p className={dataStyle}>{item.description}</p>
                        <p className={dataStyle}>{renderDate(item.day, item.month, item.year)}</p>
                        <p className={dataStyle}>R$ {renderValue(item.value)}</p>
                    </div>
                )}
            </div>
        </section>
    )
}