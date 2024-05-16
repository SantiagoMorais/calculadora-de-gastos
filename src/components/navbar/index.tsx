import { faCalculator } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const NavBar = () => {
    const items = [
        "home",
        "categorias",
        "lembretes",
    ]

    return (
        <section className="w-screen flex justify-center">
            <div className="w-full max-w-screen-xl flex flex-col justify-center flex-wrap items-center gap-2  p-4 w-1/1 md:flex-row md:justify-between">
                <h1 className="font-medium text-2xl flex gap-2 items-center text-center">
                    <FontAwesomeIcon icon={faCalculator} />
                    Calculadora de gastos
                </h1>
                <ul className="flex gap-3 flex-wrap justify-center">
                    {items.map(item =>
                        <li key={item} className="cursor-pointer duration-300 px-2 py-1 rounded-lg capitalize hover:shadow-inner hover:bg-sky-300 hover:shadow-sky-700 hover:text-white">
                            {item}
                        </li>
                    )}
                </ul>
            </div>
        </section>
    )
}