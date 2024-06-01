import { DataTable } from "./dataTable";
import { useDataFilteredByDate } from "@hooks/useDataFilteredByDate";

export const Tables = () => {
  const incomeTableColor = `bg-lime-800`;
  const expenseTableColor = `bg-red-800`;

  const dataFilteredByDate = useDataFilteredByDate()

  const incomeInfo = dataFilteredByDate.filter(data => data.valueOrigin === "income");
  const expenseInfo = dataFilteredByDate.filter(data => data.valueOrigin === "expense");

  const calculateFinalBalance = () => {
    const totalIncome = incomeInfo.reduce((acc, current) => {
      const currentAsNumber = Number(current.value);
      return acc + currentAsNumber
    }, 0)

    const totalExpense = expenseInfo.reduce((acc, current) => {
      const currentAsNumber = Number(current.value);
      return acc + currentAsNumber
    }, 0)

    return (totalIncome - totalExpense).toFixed(2)
  }

  const finalBalanceBgColor = () => {
    const finalBalance = calculateFinalBalance()

    switch (true) {
      case Number(finalBalance) < 0:
        return "bg-red-500 shadow-red-800";
      case Number(finalBalance) > 0:
        return "bg-lime-500 shadow-lime-800";
      default:
        return "bg-zinc-500 shadow-zinc-800"
    }
  };

  return (
    <section id="tables" className="flex flex-col items-center w-screen pb-4">
      <div id="pdfContent" className="w-full max-w-screen-xl flex flex-wrap justify-center px-4 gap-y-4 gap-x-1 border-b pb-5">
        <div className="w-full flex-1 min-w-80">
          <h2 title="Ganhos" className="text-center pt-2 text-xl capitalize mb-2">
            Ganhos
          </h2>
          <DataTable color={incomeTableColor} info={incomeInfo} />
        </div>

        <div className="w-full flex-1 min-w-80">
          <h2 title="Gastos" className="text-center pt-2 text-xl capitalize mb-2">
            Gastos
          </h2>
          <DataTable color={expenseTableColor} info={expenseInfo} />
        </div>

        <div className="w-full max-w-3xl flex border-black justify-center">
          <div className="flex flex-col items-center gap-1">
            <h3 className="text-center break-all text-lg capitalize md:text-xl">Saldo final:</h3>
            <p
              className={`text-center capitalize break-all font-normal text-2xl border px-3 py-1 rounded-lg border-white text-white shadow-inner duration-500 ${finalBalanceBgColor()} md:text-3xl`}
            >
              R$ {calculateFinalBalance()}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
