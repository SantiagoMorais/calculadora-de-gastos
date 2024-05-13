import { useState } from "react";
import data from "@json/data.json";
import { useForm, SubmitHandler } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

interface IFormData {
    valueOrigin: string;
    category: string;
    date: string;
    description: string;
    value: number;
}

export const Form = () => {
    const [valueOrigin, setValueOrigin] = useState<string>("");

    const handleValueOrigin = (origin: string) => {
        setValueOrigin(origin);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormData>();

    const onSubmit: SubmitHandler<IFormData> = (data) => {
        console.log(data);
    }

    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col w-full items-center gap-2">
            <div className="flex gap-4">
                {data.categories.map((category) => (
                    <label key={category.type} htmlFor={category.type} className="flex gap-2 items-center capitalize">
                        {category.name}
                        <input
                            type="radio"
                            {...register("valueOrigin")}
                            id={category.type}
                            value={category.type}
                            onChange={() => handleValueOrigin(category.type)}
                            checked={valueOrigin === category.type}
                        />
                    </label>
                ))}
            </div>

            <div className={`opacity-0 max-h-0 ${valueOrigin && "max-h-screen opacity-100 duration-500 md:max-h-48"} w-full flex gap-x-4 gap-y-1 flex-wrap justify-center`}>
                {valueOrigin && (
                    <>
                        <label htmlFor="category" className="flex flex-col w-full flex-1 min-w-40 max-w-sm ">
                            Selecione categoria:
                            <select
                                {...register("category", {
                                    required: "Selecione a categoria"
                                })}
                                id="category"
                                className="p-1 border border-black mb-1 rounded-md h-8 mt-1"
                            >
                                <option value="">Selecione categoria</option>
                                {data.categories
                                    .find((category) => category.type === valueOrigin)
                                    ?.category.map((item, index) => (
                                        <option key={index} value={item}>
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
                            <input
                                type="date"
                                {...register("date", {
                                    required: "Selecione uma data",
                                    valueAsDate: true,

                                })}
                                id="date"
                                className="w-full border border-black mb-1 p-1 rounded-md h-8 mt-1" />

                            <span className={`text-xs opacity-0 max-h-0 ${errors.date && "opacity-100 duration-500 max-h-7 py-1"} border border-red-600 px-2 rounded-md text-red-600 bg-red-50`}>
                                <FontAwesomeIcon icon={faExclamation} className="pr-1 " />
                                {errors.date?.message}
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
                                        value: 50,
                                        message: "Até 50 Caracteres"
                                    }
                                })}
                                id="description"
                                placeholder="50 Caracteres"
                                maxLength={50}
                                className="w-full border border-black mb-1 p-1 rounded-md h-8 mt-1" />

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
                                className="w-full border border-black mb-1 p-1 rounded-md h-8 mt-1" />

                            <span className={`text-xs opacity-0 max-h-0 ${errors.value && "opacity-100 duration-500 max-h-7 py-1"} border border-red-600 px-2 rounded-md text-red-600 bg-red-50`}>
                                <FontAwesomeIcon icon={faExclamation} className="pr-1 " />
                                {errors.value?.message}
                            </span>
                        </label>
                    </>
                )}
            </div>

            <button type="submit" className={`opacity-0 ${valueOrigin && "opacity-100"} border border-black rounded-md px-4 mt-6 duration-500 hover:shadow-inner hover: hover:text-blue-600 hover:border-blue-600`}>
                Adicionar
            </button>
        </form>
    );
};
