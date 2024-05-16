import { AddNewData } from "@components/addNewData"
import { NavBar } from "@components/navbar"
import { Tables } from "@components/tables"

export const Home = () => {
  return (
    <section className="flex flex-col max-w-full overflow-x-hidden">
      <NavBar />
      <AddNewData />
      <Tables />
    </section>
  )
}


