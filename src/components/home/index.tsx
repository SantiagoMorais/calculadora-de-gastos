import { AddNewData } from "@components/addNewData"
import { NavBar } from "@components/navbar"
import { Tables } from "@components/tables"
import { TimeLine } from "@components/timeLine"

export const Home = () => {
  return (
    <section className="flex flex-col max-w-full overflow-x-hidden">
      <NavBar />
      <TimeLine />
      <AddNewData />
      <Tables />
    </section>
  )
}


