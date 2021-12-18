import React, { useState } from 'react'
import { useNavigate } from 'react-router'

import {  Link } from "react-router-dom";
const Login = (props) => {
    let navigate = useNavigate();
    const [credentials,setCredentials] = useState({email:"",password:""})
    const handleSubmit = async (e)=>{
        e.preventDefault();
            const response = await fetch(`http://localhost:5000/api/auth/login`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({email:credentials.email,password:credentials.password})
              });
              const json = await response.json();
              console.log(json)
              if(json.success){
                  //Save the token and redirect to home
                  localStorage.setItem('token',json.authtoken);
                  props.showAlert("Logged In Successfully","success")
                  navigate("/")
              }else{
                  props.showAlert("Invalid Details","danger")
              }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }
    return (
        <div>
            <h2>Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" value={credentials.email} name="email" aria-describedby="emailHelp" onChange={onChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.password} name="password" id="password" onChange={onChange} />
            </div>
            <div className="mb-3"><p>Don't have an Account? <Link to="/signup">Signup</Link></p></div>
            <button type="submit" className="btn btn-primary" >Login</button>
        </form>
        </div>
    )
}

export default Login
