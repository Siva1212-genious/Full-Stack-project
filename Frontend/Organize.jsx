import { Link } from "react-router-dom"
import {useState} from 'react'

function Organize(){

    const [open, setOpen] = useState(false)

    return(
        <>
        <button  className="Hamburger" onClick={() => setOpen(!open)} > ☰ </button>
        <div className = {`sidebar ${open ? 'active' : ''}`}>
                <h2 className = 'side-bar-heading'>Go To</h2>
                <div className = "Links-Container">
                    <Link to='/Form1_Login'>Login  🔑🔒</Link>
                    <Link to='/Form1'>Register ®️</Link>
                    <Link to='/Home_Page'>Home 🏠</Link>
                    <Link to='/Posts_Data'>Posts ❤️</Link>
                    <Link to='/Search_Page'>Search 🔍</Link>
                    
                </div>
        </div>
        </>

    )
}

export default Organize