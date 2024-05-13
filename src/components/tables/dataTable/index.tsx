interface IDataTableProps {
    color: string
}

export const DataTable: React.FC<IDataTableProps> = ({color}) => { 
    const columns = [
        "categoria",
        "data",
        "descrição",
        "valor"
    ]

    const info = [
        "compras",
        "05/05/24",
        "sacolao",
        "R$58,9"
    ]

    return (
            <div className="w-full max-w-screen-xl p-4 flex flex-col">
                <div className="w-full flex flex-col border-black  border-l">
                    <div className="flex">
                        {columns.map(item =>
                            <p key={item} className={`w-full text-center capitalize flex-1 border-r border-y border-black ${color} break-all `} >
                                {item}
                            </p>
                        )}
                    </div>

                    <div className="flex">
                        {info.map(item =>
                            <p key={item} className="w-full text-center capitalize flex-1 border-r border-b border-black break-all">
                                {item}
                            </p>
                        )}
                    </div>

                    <div className="flex">
                        <p className="w-3/4 text-center border-b border-r border-black capitalize">total</p>
                        <p className={`text-center w-1/4 border-b border-r border-black ${color}`}>R$58,9</p>
                    </div>
                </div>
            </div>
    )
}