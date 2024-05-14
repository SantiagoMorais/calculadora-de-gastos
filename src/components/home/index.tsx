import { AddNewData } from "@components/addNewData"
import { NavBar } from "@components/navbar"
import { Tables } from "@components/tables"

export const Home = () => {
  return (
    <section className="flex flex-col">
      <NavBar />
      <AddNewData />
      <Tables />
    </section>
  )
}


