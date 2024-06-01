import { faSquare, faSquareCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IStickyNotes, removeStickyNote, toggleCheckedStickyNote } from "@store/reducers/stickyNotes"
import { useDispatch } from "react-redux";

interface IStickyNotesProps {
    stickyNotes: IStickyNotes[],
}

export const StickyNote = ({stickyNotes}: IStickyNotesProps) => {
    const dispatch = useDispatch();

    const renderDate = (day: number, month: number, year: number) => {
        return `${day < 10 ? `0${day}` : day} / ${month < 10 ? `0${month}` : month} / ${year.toString().slice(2)}`
    }

    const handleDeleteStickyNote = (dataId: number) => {
        dispatch(removeStickyNote(dataId))
    }

    const handleCheckStickyNote = (dataId: number) => {
        dispatch(toggleCheckedStickyNote(dataId))
    }

    return (
        <div className="border-t border-b max-h-full overflow-y-scroll">
            {stickyNotes && stickyNotes.map((item, index) =>
                <div 
                key={index}
                className="flex odd:bg-zinc-700 border-r border-l border-b last:border-b-0">
                    <button
                        title={item.checked ? "Adicione a Tarefas Não Concluídas ❌" : "Coincluir Lembrete ✅"}
                        onClick={() => handleCheckStickyNote(item.id)}
                        className={`transition-all duration-300 px-2 w-fit text-center hover:opacity-100 ${item.checked ? "text-lime-500 hover:text-red-500" : "text-red-500 hover:text-lime-500"}`}>
                        <FontAwesomeIcon icon={item.checked ? faSquareCheck : faSquare} />
                    </button>
                    <button
                        title="Remover Lembrete"
                        onClick={() => handleDeleteStickyNote(item.id)}
                        className="text-white opacity-20 transition-all duration-300 hover:opacity-100 hover:text-red-500 pr-2 w-fit text-center">
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                    <div
                        key={index}
                        className="flex w-full justify-between last:border-b-0">
                        <p className="capitalize">{item.note}</p>
                        <p className="px-2 text-center border-l">{renderDate(item.date.day, item.date.month, item.date.year)}</p>
                    </div>
                </div>
            )}
        </div>
    )
}