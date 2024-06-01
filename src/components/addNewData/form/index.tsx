import { useEffect, useState } from "react";
import data from "@json/data.json";
import { useForm, SubmitHandler } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { INewData, addNewData } from "@store/reducers/tableData";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/store";

export const Form = () => {
    const [valueOrigin, setValueOrigin] = useState<string>("");

    const dispatch = useDispatch();
    const currentDate = useSelector((state: RootState) => state.newDate)

    const handleValueOrigin = (origin: string) => {
        setValueOrigin(origin);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<INewData>();

    const onSubmit: SubmitHandler<INewData> = (formData) => {
        console.log(formData);
        dispatch(addNewData(formData))
    }

    const calculateTheDaysOfTheMonth = () => {
        const year = currentDate.currentYear;
        const month = currentDate.currentMonth.number;
        const day = 0;
        const date = new Date(year, month, day).getDate();
        return date
    }

    const configureMonthRender = () => {
        const month =
            currentDate.currentMonth.number < 10
                ? `0${currentDate.currentMonth.number}`
                : currentDate.currentMonth.number;
        return month
    }

    const configureYearRender = (currentDate.currentYear).toFixed().slice(2);

    useEffect(() => {
        const categoryElement = document.getElementById("category") as HTMLSelectElement;
        if (categoryElement) {
            categoryElement.selectedIndex = 0;
        }
    }, [valueOrigin]);

    useEffect(() => {
        setValue("month", currentDate.currentMonth.number);
        setValue("year", currentDate.currentYear);
    }, [currentDate, setValue]);

    return (
        <form
            data-testid="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="h-full flex flex-col w-full items-center gap-2">
            <div className="flex gap-4">
                {data.categories.map((category) => (
                    <label
                        key={category.type}
                        htmlFor={category.type}
                        className={`capitalize border border-white w-28 cursor-pointer rounded-md flex items-center justify-center gap-2 text-white duration-500 hover:bg-lime-500 hover:border-white hover:text-white hover:shadow-inner hover:shadow-lime-700 ${category.type === valueOrigin ? "bg-lime-500 border-white text-white shadow-inner shadow-lime-700" : "bg-zinc-800"}`}>
                        {category.name}
                        <input
                            type="radio"
                            {...register("valueOrigin")}
                            id={category.type}
                            value={category.type}
                            onChange={() => handleValueOrigin(category.type)}
                            checked={valueOrigin === category.type}
                            className="appearance-none"
                        />
                    </label>
                ))}
            </div>

            <div className={`opacity-0 max-h-0 duration-500 ${valueOrigin && "max-h-screen opacity-100 md:max-h-48"} w-full flex gap-x-4 gap-y-1 flex-wrap justify-center`}>
                {valueOrigin && (
                    <>
                        <label htmlFor="category" className="flex flex-col w-full flex-1 min-w-40 max-w-sm ">
                            Selecione categoria:
                            <select
                                {...register("category", {
                                    required: "Selecione a categoria"
                                })}
                                id="category"
                                className="bg-zinc-800 p-1 border mb-1 rounded-md h-8 mt-1"
                            >
                                <option value="" className="bg-zinc-800">Selecione categoria</option>
                                {data.categories
                                    .find((category) => category.type === valueOrigin)
                                    ?.category
                                    .map((item, index) => (
                                        <option key={index} value={item} className="bg-zinc-800">
                                            {item}
                                        </option>
                                    ))
                                }
                            </select>

                            <span className={`text-xs opacity-0 max-h-0 ${errors.category && "opacity-100 duration-500 max-h-7 py-1"} border border-red-600 px-2 rounded-md text-red-600 bg-red-50`}>
                                <FontAwesomeIcon icon={faExclamation} className="pr-1 " />
                                {errors.category?.message}
                            </span>
                        </label>

                        <label htmlFor="date" className="flex flex-col w-full flex-1 min-w-40 max-w-sm ">
                            Data:
                            <select
                                {...register("day", {
                                    required: "Selecione uma data"
                                })}
                                id="date"
                                className="bg-zinc-800 w-full border border-white mb-1 p-1 rounded-md h-8 mt-1"
                            >
                                <option value="">
                                    Dia / {configureMonthRender()} / {configureYearRender}
                                </option>
                                {Array.from({ length: calculateTheDaysOfTheMonth() }, (_, i) => (
                                    <option
                                        key={i + 1}
                                        value={i + 1}
                                    >
                                        {(i + 1) < 10 && "0"}{i + 1}  / {configureMonthRender()} / {configureYearRender}
                                    </option>
                                ))}
                            </select>

                            <span className={`text-xs opacity-0 max-h-0 ${errors.day && "opacity-100 duration-500 max-h-7 py-1"} border border-red-600 px-2 rounded-md text-red-600 bg-red-50`}>
                                <FontAwesomeIcon icon={faExclamation} className="pr-1 " />
                                {errors.day?.message}
                            </span>
                        </label>

                        <label htmlFor="description" className="flex flex-col w-full flex-1 min-w-40 max-w-sm ">
                            Descrição:
                            <input
                                required
                                type="text"
                                {...register("description", {
                                    required: "Escreva a descrição",
                                    minLength: {
                                        value: 1,
                                        message: "Escreva a descrição"
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: "Até 20 Caracteres",
                                    }
                                })}
                                id="description"
                                placeholder="20 Caracteres"
                                maxLength={20}
                                className="w-full border bg-zinc-800 mb-1 p-1 rounded-md h-8 mt-1" />

                            <span className={`text-xs opacity-0 max-h-0 ${errors.description && "opacity-100 duration-500 max-h-7 py-1"}  border border-red-600 px-2 rounded-md text-red-600 bg-red-50`}>
                                <FontAwesomeIcon icon={faExclamation} className="pr-1 " />
                                {errors.description?.message}
                            </span>
                        </label>

                        <label htmlFor="value" className="flex flex-col max-w-sm flex-1 min-w-40 ">
                            Valor:
                            <input
                                type="number"
                                {...register("value", {
                                    required: "Insira um valor",
                                    min: {
                                        value: .01,
                                        message: "insira um valor válido"
                                    },
                                })}
                                id="value"
                                placeholder="Valor"
                                maxLength={50}
                                className="bg-zinc-800 w-full border bg-transparent mb-1 p-1 rounded-md h-8 mt-1" />

                            <span className={`text-xs opacity-0 max-h-0 ${errors.value && "opacity-100 duration-500 max-h-7 py-1"} border border-red-600 px-2 rounded-md text-red-600 bg-red-50`}>
                                <FontAwesomeIcon icon={faExclamation} className="pr-1 " />
                                {errors.value?.message}
                            </span>
                        </label>
                    </>
                )}
            </div>

            <div className="flex gap-5 flex-wrap">
                <button
                    type="submit"
                    className={`opacity-0 ${valueOrigin && "opacity-100"} border border-white bg-zinc-800 text-white rounded-md px-4 mt-2 duration-500 hover: hover:text-white hover:border-white hover:bg-lime-500 hover:shadow-inner hover:shadow-lime-700`}>
                    Adicionar
                </button>
            </div>
        </form>
    );
};
