import {useEffect, useState} from 'react'
import axios from 'axios'

function Search(){

    const [input, setInput] = useState('');
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);

    function handleChange(event){
        setInput(event.target.value)
    }

    function handleClick(){
        setSearch(input)
    }

    useEffect(() =>{

        async function FetchUser(){
            try{
                const response = await axios.get("http://127.0.0.1:8000/Find/users")

                setUsers(response.data)
            }
            catch(error){
                console.log(error)
            }

    }
    FetchUser() 
   }, [])

    const Finding_user = users.filter((user) => 
        user.First_name
            ?.toLowerCase()
            .includes(search.toLowerCase()))

    const User_found = search ? Finding_user.map((user, index) => <li key = {index}>{user.First_name}<br/>{user.Email}</li>) : []


    return(

        <div>
            <span>
                <input className = "Search-Container" type="search" value={input} onChange={handleChange} placeholder="Search User"></input>
                <button className ="Search-button" onClick={handleClick}>Search</button>
            </span>
            <ul>
                {search === '' ? null : 
                  User_found.length > 0 
                   ? User_found 
                   : <p>User Not Found</p>}
            </ul>
        </div>
    )
}

export default Search