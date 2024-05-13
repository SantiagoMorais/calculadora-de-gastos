import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HomePage } from "./homePage"

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />}/>
            </Routes>
        </BrowserRouter>
    )
}