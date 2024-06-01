import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import data from "@json/data.json"
import { ICurrentMonth, changeCurrentDate } from "@store/reducers/currentDate";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const TimeLine = () => {
    const dispatch = useDispatch();
    
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const fullDate = `${day}/${month}/${year}`;

    const [currentMonth, setCurrentMonth] = useState<ICurrentMonth>({month: data.months[date.getMonth()].name, number: Number(data.months[date.getMonth()].id)});
    const [currentYear, setCurrentYear] = useState<number>(date.getFullYear());

    const handleCurrentMonth = (month: ICurrentMonth) => {
        setCurrentMonth(month);
        dispatch(changeCurrentDate({ currentMonth: month, currentYear: currentYear}))
    };

    const handleChangeYear = (action: string) => {
        const newYear = action === "next" ? currentYear + 1 : currentYear - 1
        setCurrentYear(newYear);
        dispatch(changeCurrentDate({ currentMonth: {number: currentMonth.number, month: currentMonth.month}, currentYear: newYear }))
    };

    const handleReturnDate = () => {
        setCurrentYear(date.getFullYear())
        setCurrentMonth({month: data.months[date.getMonth()].name, number:data.months[date.getMonth()].id})
    };

    const iconStyle = "text-gray-300 w-4 h-4 p-2 border border-gray-300 rounded-full duration-500 shadow-inner hover:bg-lime-500 hover:text-white hover:shadow-lime-700 md:w-6 md:h-6";
    const buttonStyle = "w-fit h-fit rounded-full flex items-center justify-center bg-zinc-800"

    useEffect(() => {
        dispatch(changeCurrentDate({ currentMonth: currentMonth, currentYear: currentYear }))
    }, [currentMonth, currentYear, dispatch])

    return (
        <section id="timeLine" data-testid="timeLineSection" className="max-w-full flex justify-center">
            <div className="p-4 w-full max-w-screen-xl border-b mb-4 flex flex-col items-center">
                <button
                    title={`Retorne para data atual: ${fullDate}`}
                    onClick={() => handleReturnDate()}
                    className="bg-zinc-800 text-center border rounded-xl duration-500 px-2 cursor-pointer uppercase tracking-widest shadow-inner hover:shadow-lime-700 hover:bg-lime-500 z-10 md:py-1">
                    Hoje
                </button>
                <div className="flex justify-center w-full gap-4 items-center my-2">
                    <button 
                    data-testid="changeYear" 
                    onClick={() => handleChangeYear("before")} 
                    className={buttonStyle}>
                        <FontAwesomeIcon 
                        data-testid="changeYear"
                        icon={faChevronLeft} 
                        className={iconStyle} />
                    </button>
                    <h2 className="font-medium text-4xl text-center mb-1 cursor-default md:text-6xl">
                        {currentYear}
                    </h2>
                    <button 
                    onClick={() => handleChangeYear("next")} 
                    className={buttonStyle}>
                        <FontAwesomeIcon 
                        data-testid="changeYear" 
                        icon={faChevronRight} 
                        className={iconStyle} />
                    </button>
                </div>
                <div className="w-full flex justify-center gap-2 flex-wrap">
                    {data.months.map(month =>
                        <button
                            data-testid="month"
                            key={month.id}
                            onClick={() => handleCurrentMonth({month: month.name, number: Number(month.id)})}
                            className={`text-sm capitalize border flex-1 max-w-24 w-full px-2 rounded-md text-center duration-500 hover:shadow-inner hover:bg-lime-500 hover:shadow-lime-700 hover:text-white ${currentMonth.month === month.name ? "bg-lime-500 shadow-lime-700 text-white shadow-inner" : "bg-zinc-800"} md:text-base`}>
                            {month.name}
                        </button>
                    )}
                </div>
            </div>
        </section>
    )
}