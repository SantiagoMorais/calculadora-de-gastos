import { faAdd, faCircle, faMinus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Form } from "./form";

export const AddNewData = () => {
    const [openWindow, setOpenWindow] = useState(false);

    const handleOpenWindow = () => {
        setOpenWindow(!openWindow)
    }

    return (
        <section id="addNewData" className="w-screen flex flex-col items-center">
            <h2 className="px-2 uppercase text-xl mb-4 flex items-center gap-4 text-center md:text-3xl">
                <FontAwesomeIcon icon={faCircle} className="text-sm" />
                Tabelas
                <FontAwesomeIcon icon={faCircle} className="text-sm" />
            </h2>
            <div className="w-full max-w-screen-xl px-4 flex items-center gap-2 justify-center">
                <button
                    data-testid="addNewDataButton"
                    onClick={() => handleOpenWindow()}
                    className="bg-zinc-800 border w-7 h-7 flex justify-center items-center rounded-md border-white duration-300 hover:shadow-inner hover: hover:text-white hover:border-white hover:shadow-lime-700 hover:bg-lime-500">
                    <FontAwesomeIcon icon={openWindow ? faMinus : faAdd} />
                </button>
                <p className="font-medium cursor-default">Adicione um novo dado</p>
            </div>

            <div data-testid="formWindow" className={`w-full max-w-screen-xl px-4 flex flex-col items-center gap-2 justify-center duration-500 transition-all overflow-hidden ${openWindow ? "mt-4 max-h-screen opacity-100 md:max-h-48" : "opacity-0 max-h-0"}`}
            >
                <Form />
            </div>
        </section>
    )
}