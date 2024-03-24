import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"",password:""})
    const {showAlert} = props
    let navigate = useNavigate()
    const handleSubmit =async (e)=>{
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                },
                
            body: JSON.stringify({email:credentials.email, password: credentials.password})
            });
                const json =await response.json();
                console.log(json);
                if(json.success){
                    //Redirect
                    localStorage.setItem("token",json.authtoken)
                    navigate("/")
                    showAlert("Logged in to your account successfully", "success")
                }
                else{
                    showAlert("Invalid Credentials","danger")
                }
    }
    const onChange=(e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
      }
  return (
    <>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={credentials.email} onChange={onChange} placeholder="Enter email"/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name='password' id="password" value={credentials.password} onChange={onChange} placeholder="Password"/>
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
    </>
  )
}

export default Login