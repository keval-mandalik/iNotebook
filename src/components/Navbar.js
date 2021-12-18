import React from 'react'
import {  Link,useLocation } from "react-router-dom";
import { useNavigate } from 'react-router'
const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem("token");
    navigate("/login")

  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/"?"active":""}` } aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/about"?"active":""}` }  aria-current="page" to="/about">About</Link>
        </li>
      </ul>
        {!localStorage.getItem("token")?<><Link className="btn btn-outline-warning mx-1" to="/login" role="button"><i className="fas fa-sign-in-alt mx-1"></i>LogIn</Link>
        <Link className="btn btn-outline-warning mx-1" to="/signup" role="button"><i className="fas fa-user-plus mx-1"></i>SignUp</Link></>:<button className="btn btn-outline-warning mx-1"onClick={handleLogout}><i className="fas fa-sign-out-alt"></i>Log Out</button>}
    </div>
  </div>
</nav>
  )
}

export default Navbar