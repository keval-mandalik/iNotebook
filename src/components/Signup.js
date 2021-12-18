import React, { useState } from 'react'
import { useNavigate } from 'react-router'


import {  Link } from "react-router-dom";
const Signup = (props) => {
  let navigate = useNavigate(); 
    const [credentials,setCredentials] = useState({name:" ",email:" ",password:" "})
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const {name,email,password} = credentials;
            const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({name,email,password})
              });
              const json = await response.json();
              console.log(json)
              if(json.success){
                  //Save the token and redirect to home
                  localStorage.setItem('token',json.authtoken);
                  navigate("/")
                  
                  props.showAlert("Account Created Successfully","success")
              }else{
                props.showAlert("Invalid Credentials","danger")
              }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }
  return (
    <div>
    <h2>Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name"  onChange={onChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email"  name="email" value={credentials.email} aria-describedby="emailHelp" onChange={onChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control"  name="password" id="password" onChange={onChange} />
            </div>
            <div className="mb-3"><p>Already have an Account? <Link to="/login">Login</Link></p></div>
            <button type="submit" className="btn btn-primary" >Signup</button>
        </form>
    </div>
  )
}

export default Signup
