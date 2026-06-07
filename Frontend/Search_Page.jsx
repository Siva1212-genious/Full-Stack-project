import {useEffect, useState} from 'react'
import axios from 'axios'

function Search_Page(){

    const [text, setText] = useState('')
    const [search, setSearch] = useState('')
    const [user, setUser] = useState([])

    function handleChange(event){
        setText(event.target.value)
    }

    function handleClick(){
        setSearch(text)
    }

    useEffect(() => {
        async function FetchData(){

            try{
                const response = await axios.get("http://127.0.0.1:8000/Find/users")
                setUser(response.data)
            }
            catch(error){
                alert("Data is Not Found!")
            }
        }

        FetchData()
    }, [])

    const Searching_data = user.filter((elem) =>
         elem.First_name
             ?.toLowerCase()
             .includes(search.toLowerCase()))

    const mapping = search ? Searching_data.map((elem, index)=> 
        <li key={index}>
            {elem.First_name}<br/>
            {elem.Last_name}<br/>
            {elem.Email}</li>): []

    return(
        <div className = "Search-Main-Container">
            <div>
            <input className ="Search-Input-Container" value={text} onChange={handleChange} type="search" placeholder="Enter User"></input>
            <button className = "Search-Button-Container" onClick={handleClick}>Search</button>
            </div>
            <div className = "Search-Display-Container">
                {search && Searching_data.length === 0 ? (
                    <p>User Not Found</p>
                ):(
                <ol>
                    {mapping}
                </ol>

                )}
            </div>
        </div>
    )
}

export default Search_Page