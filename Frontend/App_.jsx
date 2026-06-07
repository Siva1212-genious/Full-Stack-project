import { Routes,Route } from "react-router-dom"
import Form1 from "./Form1.jsx"
import Form1_Login from './Form1_Login.jsx'
import Home_Page from "./Home_Page.jsx"
import Search_Page from "./Search_Page.jsx"
import Organize from "./Organize.jsx"
import Posts from './Posts_Data.jsx'

function App_(){

    return(
        <div className = "App_-Container">
            <Organize />
            <Routes>
                <Route path="/Form1_Login" element={<Form1_Login />}></Route>
                <Route path="/Form1" element={<Form1 />}></Route>
                <Route path="/Home_Page" element={<Home_Page />}></Route>
                <Route path="/Search_Page" element={<Search_Page />}></Route>
                <Route path="/Posts_Data" element = {<Posts />}></Route>
            </Routes>       
        </div>
    )
}

export default App_