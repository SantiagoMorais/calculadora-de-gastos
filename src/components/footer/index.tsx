import { faLinkedin, faSquareGithub } from "@fortawesome/free-brands-svg-icons"
import { faAt, faCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import logo from "@assets/imgs/logo.jpg"

export const Footer = () => {
    const socialMedia = [
        {
            link: "https://www.linkedin.com/in/felipe-santiago-morais/",
            icon: faLinkedin
        },
        {
            link: "https://github.com/SantiagoMorais",
            icon: faSquareGithub
        },
        {
            link: "mailto:contatofelipesantiago@gmail.com",
            icon: faAt
        }
    ];

    return (
        <section id="footer" className="w-screen flex justify-center mt-10 bg-zinc-900">
            <div className="w-full max-w-screen-xl flex flex-col justify-center flex-wrap items-center gap-2 p-4">
                <div className="flex flex-col items-center w-full">
                    <img 
                    src={logo} 
                    alt="logo" 
                    className="w-20 rounded-full mb-2" />
                    <p className="capitalize text-lg flex gap-2 items-center md:text-xl">
                        <FontAwesomeIcon className="text-xs" icon={faCircle} />
                        Criado por Felipe Santiago
                        <FontAwesomeIcon className="text-xs" icon={faCircle} />
                    </p>
                    <p className="capitalize text-sm md:text-base">Conecte-se comigo nas redes sociais</p>
                </div>
                <ul className="flex gap-3 text-2xl md:text-4xl md:gap-5">
                    {socialMedia.map((item, index) =>
                        <li key={index} className="duration-500 hover:text-lime-500">
                            <a href={item.link} target="_blank">
                                <FontAwesomeIcon icon={item.icon} />
                            </a>
                        </li>
                    )}
                </ul>
            </div>
        </section>
    )
}