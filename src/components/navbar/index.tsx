import logo from "@assets/imgs/logo.jpg"

export const NavBar = () => {
    const items = [
        { name: "tabelas", link: "tables" },
        { name: "informações", link: "informations" },
        { name: "contato", link: "contact" },
    ]

    return (
        <section className="w-screen flex justify-center">
            <div className="w-full max-w-screen-xl flex flex-col border-b justify-center flex-wrap items-center gap-2 p-4 w-1/1 md:flex-row md:justify-between">
                <h1 className="font-medium capitalize text-2xl flex flex-col items-center text-center md:flex-row md:gap-2">
                    <img src={logo} alt="logo" className="w-20 rounded-full h-20" />
                    Farol financeiro
                </h1>
                <ul className="flex gap-3 flex-wrap justify-center">
                    {items.map(item =>
                        <a href={`#${item.link}`} key={item.name}>
                            <li key={item.name} className="cursor-pointer duration-300 px-2 py-1 rounded-lg capitalize hover:shadow-inner hover:bg-lime-500 hover:shadow-lime-700 hover:text-white">
                                {item.name}
                            </li>
                        </a>
                    )}
                </ul>
            </div>
        </section>
    )
}