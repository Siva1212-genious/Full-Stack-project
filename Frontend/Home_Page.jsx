import {useState, useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'




function Home_Page(){
    
    const [input, setInput] = useState([])
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [picture, setPicture] = useState(null)
    const Navigate = useNavigate()
    const [log, setLog] = useState()

    useEffect(() => {
        const token = localStorage.getItem("token")

        if(!token){
            Navigate("/Form1_Login")
        }
    }, [])
    

    function handleTitle(event){
        setTitle(event.target.value)
    }
    function handleContent(event){
        setContent(event.target.value)
    }
    function handlePicture(event){
        setPicture(event.target.files[0])
    }

    async function handleClick(){

        const token = localStorage.getItem("token")

        const formData = new FormData()

        formData.append("Title",title)
        formData.append("Content",content)
        formData.append("Picture", picture)

        try{
            const response = await axios.post("http://127.0.0.1:8000/Users/Post", formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type" : "multipart/form-data"
                    }
                }
            )
            const data = response.data

            setInput(input => [...input, data])
            alert('Post Uploaded Succesfully!!!')
            
            }
        catch(error){
            console.log(error)
            alert("Upload failed")
        }

        setTitle('')
        setContent('')
        setPicture(null)

    }

    function handleLogOut(){
        
        localStorage.removeItem("token")
        Navigate("/Form1_Login")

    }

    return(
        <div className="Home-Main-Post-Container">
            <h1>You can post your data here</h1>
            <button className='Logout-Button' onClick={handleLogOut}>Log Out</button>
            <div className = "Home-post-Container">
                <input className="Home-Input-Container" onChange={handleTitle} type="text" placeholder="Enter Title"></input>
                <br/>
                <textarea className="Home-Input-Container" onChange={handleContent} type="text" placeholder="Enter Content"></textarea>
                <br/>
                <input className="Home-Input-Container" onChange={handlePicture} type="file" placeholder="Upload_Image" accept="image/*"></input>
                <br/>
                {
                    picture && (<img src={URL.createObjectURL(picture)} width="200"/>)
                }
                <br/>
                <button className="Home-Butt-Container" onClick={handleClick}>Post</button>
            </div>
        </div>
    )
}

export default Home_Page