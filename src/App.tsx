import { AddNewData } from "@components/addNewData"
import { NavBar } from "@components/navbar"
import { Tables } from "@components/tables"


function App() {
  return (
    <section className="flex flex-col">
      <NavBar />
      <AddNewData />
      <Tables />
    </section>
  )
}

export default App
