import React from 'react'
import {NavLink, Link} from 'react-router-dom'
import { useAuth } from '../../Context/auth'
import toast from 'react-hot-toast'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {
    const[auth,setAuth]=useAuth()
    const handleLogout =()=>{
        setAuth({
            ...auth,
            user:null,
            token:"",
        }) 
        localStorage.removeItem('auth');
        toast.success("Logout Successfully");
       }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link to="/" className="navbar-brand" >SMT. Enterprises</Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link" >Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/category" className="nav-link">Category</NavLink>
                            </li>
                           {
                           !auth.user?(<>
                            <li className="nav-item">
                                <NavLink to="/register" className="nav-link" >Register</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/login" className="nav-link" >Login</NavLink>
                            </li>
                           </>):(<>
                                {/* <li className='nav-item dropdown'>
                                 <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                     {auth?.user?.name}
                                    </NavLink>

                                <ul className="dropdown-menu">
                                    <li><NavLink to="/dashboard" className="dropdown-item" >Dashboard</NavLink></li>
                                    <li><NavLink onClick={handleLogout} to="/login" className="nav-link" >Logout</NavLink></li>
                                </ul>
                            </li> */}

{ <li className='nav-item dropdown'>
    <Navbar.Collapse id="navbar-dark-example">
          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title={auth?.user?.name}
              menuVariant="dark"
            >
           
              <NavDropdown.Item href="#action/3.2">
              <NavLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} className="dropdown-item" >Dashboard</NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3"><NavLink onClick={handleLogout} to="/login" className="dropdown-item" >Logout</NavLink></NavDropdown.Item>             
            </NavDropdown>
          </Nav>
        </Navbar.Collapse></li>}
                           </>)}
                            <li className="nav-item">
                                <NavLink to="/cart" className="nav-link" >Cart (0)</NavLink>
                            </li>
                        </ul>
                       
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header
