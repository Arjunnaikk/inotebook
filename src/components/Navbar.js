import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar = () => {
  let navigate = useNavigate()
    let location = useLocation()
    const handleLogout = ()=>{
      localStorage.removeItem("token")
      navigate("/login")
    }
  return (
    
    <>
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/"? "active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/about"? "active":""}`} to="/about">About</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/profile"? "active":""}`} to="/profile">Profile</Link>
        </li>
      </ul>
    </div>
    {!localStorage.getItem("token")?<form action="submit">
    <Link className="btn btn-warning mx-1" to="/login" role="button">Login</Link>
    <Link className="btn btn-warning mx-1" to="/signup" role="button">Sign up</Link>
    </form>:<button onClick={handleLogout} className='btn btn-warning'>Logout</button>}
  </div>
</nav>
    </>
  )
}

export default Navbar;