import { AddNewData } from "@components/addNewData"
import { NavBar } from "@components/navbar"
import { Tables } from "@components/tables"
import { TimeLine } from "@components/timeLine"
import "./index.css"

export const Home = () => {
  return (
    <>
      <div className="background"></div>
      <section className="flex flex-col max-w-full overflow-x-hidden">
        <div className="z-10">
          <NavBar />
          <TimeLine />
          <AddNewData />
          <Tables />
        </div>
      </section>
    </>
  )
}


