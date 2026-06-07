import {useEffect, useState} from 'react'
import axios from 'axios'
import Form1 from './Form1'
import {Link} from "react-router-dom"
import { useNavigate } from 'react-router-dom'

function Login_page(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showregister, setShowRegister] = useState(false)
    const Navigate = useNavigate()



    function handleEmail(event){ 
        setEmail(event.target.value)
    }
    function handlePassword(event){
        setPassword(event.target.value)
    }

    async function handleClick(){
        const details = {
            Email: email,
            Password: password,
        }

        try{

            const Login_url = await axios.post("http://127.0.0.1:8000/Login/users", details)
            const response = Login_url.data

            localStorage.setItem("token", Login_url.data.Access_token)

            Navigate('/Home_Page')
        }
        catch(error){
            alert("un-authorised access!!!")
        }

        setEmail('')
        setPassword('')
    }

    function handleRegisterClick(){
        setShowRegister(true)
    }
    if(showregister){
        return <Form1/>
    }



    return(
        <div className = "Login-Main-Container">
            <h1>Login Page</h1>
            <div className="Login-Input-Container">
                <label htmlFor="email">Email</label>
                <input className="Login-Container" type="email" value={email} onChange={handleEmail} id="email" placeholder="Enter Email"></input>
                <br/>
                <label htmlFor="password">Password</label>
                <input className="Login-Container" type="password" value={password} onChange={handlePassword} id = "password" placeholder="Enter Password"></input>
                <br/>
                <button className="Butt-Container" onClick={handleClick}>Login</button>
                <br/>
                <button className="RegButton-Container" onClick={handleRegisterClick}>Register</button>
                
            </div>
        </div>
    )
}

export default Login_page