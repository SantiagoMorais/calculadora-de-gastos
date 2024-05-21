import { faAdd } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Form } from "./form";

export const AddNewData = () => {
    const [openWindow, setOpenWindow] = useState(false);

    const handleOpenWindow = () => {
        setOpenWindow(!openWindow)
    }

    return (
        <section className="w-screen flex flex-col items-center">
            <div className="w-full max-w-screen-xl px-4 flex items-center gap-2 justify-center">
                <button
                    onClick={() => handleOpenWindow()}
                    className="border w-7 h-7 flex justify-center items-center rounded-md border-white duration-300 hover:shadow-inner hover: hover:text-white hover:border-white hover:shadow-lime-700 hover:bg-lime-400">
                    <FontAwesomeIcon icon={faAdd} />
                </button>
                <p className="font-medium">Adicione um novo dado</p>
            </div>

            <div className={`w-full max-w-screen-xl px-4 flex flex-col items-center gap-2 justify-center duration-500 transition-all overflow-hidden opacity-0 ${openWindow ? "mt-4 max-h-screen opacity-100 md:max-h-48" : "max-h-0"}`}
            >
                <Form />
            </div>
        </section>
    )
}