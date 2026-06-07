import {useEffect, useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Posts(){

    const [data, setData] = useState([])
    const Navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")

        if(!token){
            Navigate("/Form1_Login")
        }
    }, [])

    

    useEffect(() => {

        const token = localStorage.getItem("token")

        async function handleData(){
            try{
                const response = await axios.get("http://127.0.0.1:8000/Posts/User", 
                    {
                        headers :{
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setData(response.data)
            }
            catch(error){
                alert("Data is Not Found!!")
            }
        }

        handleData()
    }, [])

    function handleLogOut(){
        Navigate('/Form1_Login')
        
    }


    return(
        <div className = "Posts-Retrival-Container">
            <header className="Feed-Header">Feed</header>
            <button className="button-Container" onClick={handleLogOut}>LogOut</button>
            <div className="Feed-Container">
                {data.map((elem) =>
                <div className="Post-Card" key={elem.Id}>
                    <div className="Title-Container">
                        <h3>{elem.Title}</h3>
                    </div>

                    <img src={`http://127.0.0.1:8000/${elem.Picture}`} 
                         alt="Picture"
                         className="Picture-Container"/>
                    
                    <div className="Content-Container">
                        <p>{elem.Content}</p>
                    </div>

                </div>

            
            )}
        </div>
            
            
        </div>
    )
}

export default Posts