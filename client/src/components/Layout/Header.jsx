import React from "react";
import { NavLink } from 'react-router-dom'
import { useAuth } from "../../context/auth";
import { Badge } from "antd";
import { useCart } from "../../context/cart";

const Header = () => {
    const [auth, setAuth] = useAuth();
    const [cart]=useCart();
    const handleLogout = () => {
        setAuth({
            ...auth, user: null, token: '',
        });
        localStorage.removeItem('auth');
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">FreshSips</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse me-4" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-4">
                            <li className="nav-item">
                                <NavLink to='/' className="nav-link">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <Badge count={cart?.length} showZero className="p-1">
                                    <NavLink to='/cart' className="nav-link">Cart</NavLink>
                                </Badge>
                            </li>
                            {
                                !auth?.user ? (<><li className="nav-item">
                                    <NavLink to='/register' className="nav-link" >Signup</NavLink>
                                </li>
                                    <li className="nav-item">
                                        <NavLink to='/login' className="nav-link" >Login</NavLink>
                                    </li></>) : (<>
                                        <li className="nav-item dropdown">
                                            <NavLink className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {auth?.user?.username}
                                            </NavLink>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    {/* <NavLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} className="dropdown-item">
                                                        Dashboard
                                                    </NavLink> */}
                                                </li>
                                                <li className="dropdown-item">
                                                    <NavLink to='/login' onClick={handleLogout} className="nav-link me-4" >Logout</NavLink>
                                                </li>
                                            </ul>
                                        </li></>)
                            }
                        </ul>
                        {/* <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form> */}
                    </div>
                </div>
            </nav>

        </>
    );
};

export default Header;
