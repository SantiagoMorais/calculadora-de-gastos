import { faAdd, faCircle, faMinus, faTimes, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Form } from "./form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/store";
import { removeTableData } from "@store/reducers/tableData";

export const AddNewData = () => {
    const [openWindow, setOpenWindow] = useState<boolean>(false);
    const [deleteDataWindow, setDeleteDataWindow] = useState<boolean>(false)

    const dispatch = useDispatch();

    const tablesData = useSelector((state: RootState) => state.tablesData)
    const currentDate = useSelector((state: RootState) => state.newDate)
    const currentMonthInNumber = currentDate.currentMonth.number
    const currentMonth = currentDate.currentMonth.month
    const currentYear = currentDate.currentYear

    const handleOpenWindow = () => {
        setOpenWindow(!openWindow)
    }

    const handleDeleteDataWindow = () => {
        setDeleteDataWindow(!deleteDataWindow)
    }

    const handleDeleteData = (typeData: string) => {
        if (typeData === "monthData") {
            const filteredDataByDate = tablesData.filter((item) => item.month === currentMonthInNumber && item.year === currentYear)
            if (filteredDataByDate.length) {
                filteredDataByDate.map(dataToDelete =>
                    dispatch(removeTableData(dataToDelete.id))
                )
            } else (alert("Não há dados para serem deletados"))
        } else if (typeData === "allData") {
            if (tablesData.length) {
                tablesData.map(data =>
                    dispatch(removeTableData(data.id))
                )
            } else (alert("Não há dados para serem deletados"))
        }
        setDeleteDataWindow(!deleteDataWindow)
    }

    return (
        <section id="addNewData" className="w-screen flex flex-col items-center">
            <h2 className="px-2 uppercase text-xl mb-4 flex items-center gap-4 text-center md:text-3xl">
                <FontAwesomeIcon icon={faCircle} className="text-sm" />
                Tabelas
                <FontAwesomeIcon icon={faCircle} className="text-sm" />
            </h2>
            <div className="w-full max-w-screen-xl px-4 flex items-center gap-2 justify-center">
                <label className="font-medium cursor-pointer flex gap-2">
                    Adicione dados
                    <button
                        data-testid="addNewDataButton"
                        onClick={() => handleOpenWindow()}
                        className="bg-zinc-800 border w-7 h-7 flex justify-center items-center rounded-md border-white duration-300 hover:shadow-inner hover: hover:text-white hover:border-white hover:shadow-lime-700 hover:bg-lime-500">
                        <FontAwesomeIcon icon={openWindow ? faMinus : faAdd} />
                    </button>
                </label>
                <label className="font-medium cursor-pointer flex flex-row-reverse gap-2">
                    Deletar dados
                    <button
                        data-testid="deleteData"
                        onClick={() => handleDeleteDataWindow()}
                        className="bg-zinc-800 border w-7 h-7 flex justify-center items-center rounded-md border-white duration-300 hover:shadow-inner hover: hover:text-white hover:border-white hover:shadow-red-700 hover:bg-red-500">
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                </label>
            </div>

            {deleteDataWindow &&
                <>
                    <div className="w-screen h-screen fixed z-20 bg-black top-0 opacity-60 flex justify-center items-center">
                    </div>
                    <div className="mx-2 max-w-96 bg-zinc-100 text-black rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 border border-black">
                        <div className="flex justify-between mt-2 mr-2 ml-3 border-b pb-2 items-center border-black ">
                            <h2 className="capitalize text-lg font-medium">
                                Deletar dados
                            </h2>
                            <button
                                onClick={handleDeleteDataWindow}
                                className="w-7 bg-zinc-800 text-white rounded-md duration-500 hover:bg-lime-600">
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                        <p className="w-full text-justify px-3 pb-3 pt-2">
                            Você tem certeza de que deseja <span className="font-bold uppercase text-red-500">deletar</span> os seus dados? Essa ação é irreversível e os dados perdidos não poderão ser acessados novamente.
                        </p>
                        <div className="flex flex-col pb-3 px-3 gap-2">
                            <button
                                onClick={() => handleDeleteData("allData")}
                                className="bg-zinc-800 text-white px-3 py-1 rounded-lg duration-500 hover:bg-lime-600 min-w-fit text-sm">
                                Deletar TODOS os dados
                            </button>
                            <hr className="bg-black" />
                            <button
                                onClick={() => handleDeleteData("monthData")}
                                className="bg-zinc-800 text-white px-3 py-1 rounded-lg duration-500 hover:bg-lime-600 min-w-fit text-sm">
                                Deletar dados do mês: {currentMonth} / {currentYear}
                            </button>
                            <hr className="bg-black" />
                            <button
                                onClick={handleDeleteDataWindow}
                                className="bg-zinc-800 text-white px-3 py-1 rounded-lg duration-500 hover:bg-red-600 min-w-fit text-sm">
                                Cancelar
                            </button>
                        </div>

                    </div>
                </>
            }

            <div data-testid="formWindow" className={`w-full max-w-screen-xl px-4 flex flex-col items-center gap-2 justify-center duration-500 transition-all overflow-hidden ${openWindow ? "mt-4 max-h-screen opacity-100 md:max-h-96" : "opacity-0 max-h-0"}`}>
                <Form />
            </div>
        </section>
    )
}