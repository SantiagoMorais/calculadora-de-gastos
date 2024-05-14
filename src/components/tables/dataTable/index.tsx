import { INewData } from "@store/reducers/tableData"

interface IDataTableProps {
    color: string
    info: INewData[]
}

export const DataTable: React.FC<IDataTableProps> = ({ color, info }) => {
    const totalValue = info.reduce((acc, currentValue) => {
        const value = Number(currentValue.value.replace("R$", ""));
        return acc + value
    }, 0)
    
    const columns = [
        "categoria",
        "data",
        "descrição",
        "valor"
    ]

    return (
        <div className="w-full max-w-screen-xl flex flex-col">
            <div className="w-full flex flex-col border-black  border-l">
                <div className="flex">
                    {columns.map(item =>
                        <p key={item} className={`w-full text-center capitalize flex-1 border-r border-y border-black ${color} break-all `} >
                            {item}
                        </p>
                    )}
                </div>

                <div className="flex flex-col">
                    {info?.map((data, index) => (
                        <div key={index} className="flex w-full">
                            {Object.values(data).map((item, i) => (
                                item !== data.id && item !== data.valueOrigin && (
                                    <p key={i} className="w-full text-center capitalize flex-1 border-r border-b border-black break-all">
                                        {item}
                                    </p>
                                )
                            ))}
                        </div>
                    ))}
                </div>

                <div className="flex">
                    <p className="w-3/4 text-center border-b border-r border-black capitalize">total</p>
                    <p className={`text-center w-1/4 border-b border-r border-black ${color}`}>R${totalValue}</p>
                </div>
            </div>
        </div>
    )
}