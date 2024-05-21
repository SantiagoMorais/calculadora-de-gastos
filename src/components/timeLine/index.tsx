import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import data from "@json/data.json"
import { useState } from "react";

export const TimeLine = () => {
    const date = new Date();

    const [currentMonth, setCurrentMonth] = useState<string>(data.months[date.getMonth()])
    const [currentYear, setCurrentYear] = useState<number>(date.getFullYear())

    const handleCurrentMonth = (month: string) => {
        setCurrentMonth(month)
    }

    const handleChangeYear = (action: string) => {
        setCurrentYear(action === "next" ? currentYear + 1 : currentYear - 1)
    }

    const buttonStyle = "text-xl text-gray-300 w-6 h-6 p-2 border border-gray-300 rounded-full duration-500 shadow-inner hover:bg-sky-300 hover:text-white hover:shadow-sky-700"

    return (
        <section className="max-w-full flex justify-center">
            <div className="p-4 w-full max-w-screen-xl border-b border-t mb-4">
                <div className="flex justify-center w-full gap-4 items-center">
                    <button onClick={() => handleChangeYear("before")} className="w-fit h-fit rounded-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faChevronLeft} className={buttonStyle}/>
                    </button>
                    <h2 className="font-medium text-6xl text-center mb-4">
                        {currentYear}
                    </h2>
                    <button onClick={() => handleChangeYear("next")} className="w-fit h-fit rounded-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faChevronRight} className={buttonStyle}/>
                    </button>
                </div>
                <div className="w-full flex justify-center gap-2 flex-wrap">
                    {data.months.map(month =>
                        <button onClick={() => handleCurrentMonth(month)} className={`capitalize border flex-1 max-w-24 w-full px-2 rounded-md text-center duration-500  hover:shadow-inner hover:bg-sky-300 hover:shadow-sky-700 hover:text-white ${currentMonth === month && "bg-sky-300 shadow-sky-700 text-white shadow-inner"}`}>
                            {month}
                        </button>
                    )}
                </div>
            </div>
        </section>
    )
}