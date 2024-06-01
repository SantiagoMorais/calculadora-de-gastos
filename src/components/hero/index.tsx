import baseImage from "@assets/imgs/computer-hero-image.jpg"
import "./index.css"

interface IHeroProps {
    onStartTour: React.MouseEventHandler<HTMLButtonElement>
}

export const Hero: React.FC<IHeroProps> = ({onStartTour}) => {

    return (
        <section id="hero" className="w-screen flex justify-center">
            <div className="relative w-full max-w-screen-xl flex border-b flex-col justify-center flex-wrap items-center gap-2 w-1/1 md:flex-row md:justify-between max-h-screen">
                <img
                    className="heroImage"
                    src={baseImage}
                    alt="Homem conferindo suas finanças" />
                <h1 className="absolute text-lg font-bold w-2/5 left-10 top flex flex-col gap-5 md:text-3xl">
                Visualise e ilumine suas decisões econômicas com o Farol Financeiro.
                
                <button 
                onClick={onStartTour}
                className="text-base w-fit px-3 rounded-md border duration-500 hover:bg-lime-600 hover:shadow-inner hover:shadow-lime-800 md:text-lg">
                    Comece o tutorial!
                </button>
                </h1>
            </div>
        </section>
    )
}