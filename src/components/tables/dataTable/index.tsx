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

    const totalValue = info.reduce((acc, currentValue) => {
        const value = Number(currentValue.value.replace("R$", ""));
        return acc + value
    }, 0)

    const handleDeleteData = (dataId: number) => {
        dispatch(removeTableData(dataId))
    }

    const columns = [
        "categoria",
        "data",
        "descrição",
        "valor"
    ]

    return (
        <div className="w-full pr-5 max-w-screen-xl flex flex-col">
            <div className="w-full flex flex-col border-white border-l">
                <div className="flex">
                    {columns.map(item =>
                        <p key={item} className={`w-full text-center capitalize flex-1 border-r border-y border-white ${color} break-all `} >
                            {item}
                        </p>
                    )}
                </div>

                <div className="flex flex-col">
                    {info?.map((data, index) => (
                        <div key={index} className="flex w-full relative">
                            <button
                                onClick={() => handleDeleteData(data.id)}
                                className="absolute w-5 -right-5 text-white opacity-20 transition-all duration-300 hover:opacity-100 hover:text-lime-500">
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                            {Object.values(data).map((item, i) => (
                                item !== data.id && item !== data.valueOrigin && (
                                    <p key={i} className="w-full text-center capitalize flex-1 border-r border-b border-white break-all">
                                        {item}
                                    </p>
                                )
                            ))}
                        </div>
                    ))}
                </div>

                <div className="flex">
                    <p className="w-3/4 text-center border-b border-r border-white capitalize">total</p>
                    <p className={`text-center w-1/4 border-b border-r border-white ${color}`}>R${totalValue}</p>
                </div>
            </div>
        </div>
    )
}