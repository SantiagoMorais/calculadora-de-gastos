import { faChevronLeft, faChevronRight, faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import data from "@json/data.json"
import { changeCurrentDate } from "@store/reducers/currentDate";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const TimeLine = () => {
    const date = new Date();
    const dispatch = useDispatch();

    const [currentMonth, setCurrentMonth] = useState<string>(data.months[date.getMonth()].name)
    const [currentYear, setCurrentYear] = useState<number>(date.getFullYear())

    const handleCurrentMonth = (month: string) => {
        setCurrentMonth(month);
        dispatch(changeCurrentDate({ currentMonth: month, currentYear: currentYear.toString()}))
    }

    const handleChangeYear = (action: string) => {
        const newYear = action === "next" ? currentYear + 1 : currentYear -1
        setCurrentYear(newYear);
        dispatch(changeCurrentDate({ currentMonth: currentMonth, currentYear: newYear.toString()}))
    }

    const handleReturnDate = () => {
        setCurrentYear(date.getFullYear())
        setCurrentMonth(data.months[date.getMonth()].name)
        dispatch(changeCurrentDate({ currentMonth: currentMonth, currentYear: date.getFullYear().toString()}))
    }
    
    
    const buttonStyle = "text-xl text-gray-300 w-6 h-6 p-2 border border-gray-300 rounded-full duration-500 shadow-inner hover:bg-lime-400 hover:text-white hover:shadow-lime-700"

    return (
        <section className="max-w-full flex justify-center">
            <div className="p-4 w-full max-w-screen-xl border-b border-t mb-4 flex flex-col items-center">
            <button 
            title="Retorne para data atual" 
            onClick={() => handleReturnDate()}
            className="text-center border rounded-full duration-500 w-10 h-10 shadow-inner hover:shadow-lime-700 hover:bg-lime-500">
                <FontAwesomeIcon icon={faRotateLeft} />
            </button>
                <div className="flex justify-center w-full gap-4 items-center">
                    <button onClick={() => handleChangeYear("before")} className="w-fit h-fit rounded-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faChevronLeft} className={buttonStyle} />
                    </button>
                    <h2 className="font-medium text-6xl text-center mb-4">
                        {currentYear}
                    </h2>
                    <button onClick={() => handleChangeYear("next")} className="w-fit h-fit rounded-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faChevronRight} className={buttonStyle} />
                    </button>
                </div>
                <div className="w-full flex justify-center gap-2 flex-wrap">
                    {data.months.map(month =>
                        <button 
                        key={month.id}
                        onClick={() => handleCurrentMonth(month.name)} 
                        className={`capitalize border flex-1 max-w-24 w-full px-2 rounded-md text-center duration-500  hover:shadow-inner hover:bg-lime-400 hover:shadow-lime-700 hover:text-white ${currentMonth === month.name && "bg-lime-400 shadow-lime-700 text-white shadow-inner"}`}>
                            {month.name}
                        </button>
                    )}
                </div>
            </div>
        </section>
    )
}