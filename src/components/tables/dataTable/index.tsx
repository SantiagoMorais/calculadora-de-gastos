import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { INewData, removeTableData } from "@store/reducers/tableData"
import { useDispatch } from "react-redux"

interface IDataTableProps {
    color: string
    info: INewData[]
}

export const DataTable: React.FC<IDataTableProps> = ({ color, info }) => {
    const dispatch = useDispatch();

    const totalValue = () => {
        const calculation = info.reduce((acc, currentValue) => {
            const value = Number(currentValue.value.replace("R$", ""));
            return acc + value
        }, 0);
        return calculation.toFixed(2)
    }

    const handleDeleteData = (dataId: number) => {
        dispatch(removeTableData(dataId))
    }

    const columns = [
        "categoria",
        "data",
        "descrição",
        "valor"
    ]

    const dataStyle = "w-full text-center capitalize flex-1 border-r border-b border-white break-all px-1 text-sm md:text-base"

    const renderDate = (data: string, value: number) => {
        switch(true) {
            case data === "day" || data === "month":
                return value < 10 ? `0${value}` : value;
            case data === "year":
                return value.toFixed().slice(2);
            default:
                "00"
        }
    }

    const renderValue = (value: string) => {
        return Number(value).toFixed(2)
    }

    return (
        <div className="w-full pr-5 max-w-screen-xl flex flex-col">
            <div className="w-full flex flex-col border-white border-l">
                <div className="flex">
                    {columns.map(item =>
                        <p key={item} className={`w-full text-center capitalize flex-1 border-r border-y border-white ${color} break-all px-1 text-sm md:text-base`} >
                            {item}
                        </p>
                    )}
                </div>

                <div className="flex flex-col bg-zinc-800">
                    {info?.map((data, index) => (
                        <div key={index} className="flex w-full relative odd:bg-zinc-600">
                            <button
                                onClick={() => handleDeleteData(data.id)}
                                className="absolute w-5 -right-5 text-white opacity-20 transition-all duration-300 hover:opacity-100 hover:text-red-500">
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                            <p className={dataStyle}>{data.category}</p>
                            <p className={dataStyle}>{renderDate("day", data.day)}/{renderDate("month", data.month)}/{renderDate("year", data.year)}</p>
                            <p className={dataStyle}>{data.description}</p>
                            <p className={dataStyle}>R${renderValue(data.value)}</p>
                        </div>
                    ))}
                </div>

                <div className="flex">
                    <p className="w-3/4 text-center border-b border-r border-white capitalize break-all bg-zinc-900 text-sm md:text-base">total</p>
                    <p className={`text-center w-1/4 border-b border-r border-white ${color} break-all text-sm md:text-base`}>R${totalValue()}</p>
                </div>
            </div>
        </div>
    )
}