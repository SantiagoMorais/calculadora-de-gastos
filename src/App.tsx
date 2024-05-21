import { Home } from "@components/home"
import { store } from "@store/store"
import { Provider } from "react-redux"

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  )
}

export default App
