import { faAdd, faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IStickyNotes, addNewStickyNote } from "@store/reducers/stickyNotes";
import { RootState } from "@store/store";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { StickyNote } from "../stickyNote";

export const AddNewStickyNote = () => {
    const dispatch = useDispatch();
    const stickyNotes = useSelector((state: RootState) => state.stickyNotes)
    const uncheckedStickyNotes = stickyNotes.filter(data => data.checked === false);
    // const checkedStickyNotes = stickyNotes.filter(data => data.checked === true);

    console.log(uncheckedStickyNotes);
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<IStickyNotes>();

    const onSubmit: SubmitHandler<IStickyNotes> = (formData) => {
        dispatch(addNewStickyNote(formData))
    };

    useEffect(() => {
        const date = new Date();
        setValue("date.day", date.getDate());
        setValue("date.month", date.getMonth() + 1);
        setValue("date.year", date.getFullYear());
        setValue("checked", false)
    }, [setValue]);

    return (
        <section id="addNewStickyNites" className="flex-1 h-72 bg-zinc-900 rounded-md border border-white p-2 flex min-w-60 flex-col gap-2">
            <h2 className="text-base w-full border-b h-fit capitalize md:text-xl">Adicione lembretes / tarefas</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="relative">
                <div className="flex gap-1 items-center mb-1">
                    <input
                        {...register("note", {
                            required: "Descreva seu lembrete",
                            maxLength: {
                                value: 20,
                                message: "Até 20 Caracteres"
                            }
                        })}
                        type="text"
                        placeholder="Descreva seu lembrete"
                        className="w-full border bg-zinc-800 p-1 rounded-md h-8"
                        maxLength={20}
                    />
                    <button
                        type="submit"
                        className="border border-white bg-zinc-800 text-white rounded-md px-4 duration-500 h-8 hover: hover:text-white hover:border-white hover:bg-lime-500 hover:shadow-inner hover:shadow-lime-700">
                        <FontAwesomeIcon icon={faAdd} />
                    </button>
                </div>
                <span className={`text-xs opacity-0 max-h-0 ${errors.note && "block opacity-100 duration-500 max-h-7 py-1"} absolute -bottom-7 border border-red-600 px-2 rounded-md text-red-600 bg-red-50`}>
                    <FontAwesomeIcon icon={faExclamation} className="pr-1 " />
                    {errors.note?.message}
                </span>
            </form>
            
            <StickyNote stickyNotes={uncheckedStickyNotes}/>
        </section>
    )
}