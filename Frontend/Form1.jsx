import { useState } from 'react'
import axios from 'axios'
import Search from './Form11.jsx'


function Form1(){

    const [inputs, setInputs ] = useState([]);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reenterpassword, setReEnterPassword] = useState('');
    const [gender, setGender] = useState('')

    function handleFirstName(event){
        setFirstname(event.target.value)
    }
    function handleSecondName(event){
        setLastname(event.target.value)
    }
    function handleEmail(event){
        setEmail(event.target.value)
    }
    function handlePassword(event){
        setPassword(event.target.value)
    }
    function handleReEnterPassword(event){
        setReEnterPassword(event.target.value)
    }
    function handleGender(event){
        setGender(event.target.value)
    }

    async function handleClick(event){
        event.preventDefault();

        //Validations

        if(firstname === ''){
            alert("First_name is required")
            return
        }

        if(lastname === ''){
            alert("Last_name is required")
            return
        }

        if(email === ''){
            alert("Email is required")
            return
        }

        if(password === ''){
            alert("Password is required")
            return
        }

        if(reenterpassword === ''){
            alert("Re-Enter-Password to make sure Password is correct")
            return
        }
        

        if(password !== reenterpassword){
            alert("The Password and Re-Enter-Password does not match")
            return
        }

        if(!email.includes('@') ||(!email.includes('.com') && !email.includes('.edu') && !email.includes('.in'))){
            alert("This is not a valid email")
            return
        }

        if(firstname.length > 15){
            alert("First_name should be less than or equal to 15 characters")
            return
        }

        if(lastname.length > 15){
            alert("Last_name should be less than or equal to 15 characters")
            return
        }
        if(!password.length >10 || password.length < 8){
            alert("Password should have atleast 8 characters and atmost 10 characters")
            return
        }
        
        

        const details = {
            First_name : firstname,
            Last_name : lastname,
            Email : email,
            Password : password,
            Re_Enter_Password : reenterpassword,
            Gender: gender,
        }

        
    

        const post_data = await axios.post("http://127.0.0.1:8000/Create/users", details)
        const data = post_data.data

        setInputs(inputs => [...inputs, data])

        setFirstname('')
        setLastname('')
        setEmail('')
        setPassword('')
        setReEnterPassword('')
        setGender('')

    }

    const Details = inputs.map((input, index) => <li key={index}>Data Entered Succesfully</li>)

    return(
        <div className="Main-Container">
            <span>
            <h1 >Regestration Form</h1>
            <Search />
            </span>
            <form className="Form-Container" onSubmit={handleClick}>
                <label htmlFor="firstname">Firstname*</label>
                <input value={firstname} className="Box-Container" onChange={handleFirstName} id="firstname" type='text' placeholder="First Name"/>
                <br/>
                <label htmlFor="lastname">Lastname*</label>
                <input value={lastname} className="Box-Container" onChange={handleSecondName}  id="lastname" type='text' placeholder="Last Name"/>
                <br/>
                <label htmlFor="email">Email</label>
                <input value={email} className="Box-Container" onChange={handleEmail}  id="email" type="email" placeholder="Email" />
                <br/>
                <label htmlFor="password">Password</label>
                <input value={password} className="Box-Container" onChange={handlePassword}  id="password" type='password' placeholder="Password" />
                <br/>
                <label htmlFor="re-enter-password">Re-Enter-Password</label>
                <input value={reenterpassword} className="Box-Container" onChange={handleReEnterPassword}  id="re-enter-password" type='password' placeholder="Re-Enter-Password" />
                <br/>
                <label htmlfor="gender">Gender</label>
                <select id="gender" className='Gender-Container' value={gender} onChange={handleGender}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                </select>
                <button type="submit" className="Button-Container">Submit</button>
            </form>

        <div>
            <ol>
                {Details}
            </ol>
        </div>
        </div>
    )
}

export default Form1