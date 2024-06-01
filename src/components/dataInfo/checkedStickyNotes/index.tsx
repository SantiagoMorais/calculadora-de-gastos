import { useSelector } from "react-redux"
import { StickyNote } from "../stickyNote"
import { RootState } from "@store/store"

export const CheckedStickyNotes = () => {
    const stickyNotes = useSelector((state: RootState) => state.stickyNotes);
    const checkedStickyNotes = stickyNotes.filter(stickyNote => stickyNote.checked === true)

    return (
        <section className="flex-1 h-72 bg-zinc-900 rounded-md border border-white p-2 flex min-w-60 flex-col gap-2">
            <h2 className="text-base w-full border-b h-fit capitalize md:text-xl">Lembretes / Tarefas Concluídos</h2>
            <StickyNote stickyNotes={checkedStickyNotes} />
        </section>
    )
}